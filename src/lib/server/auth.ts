import { env } from '$lib/env';
import { defineAirtableTable } from '$lib/server/airtable';
import { z } from 'zod';
import { randomBytes, createHash } from 'node:crypto';

const OAUTH_SCOPES = ['openid', 'profile', 'email', 'verification_status'];
const HACKCLUB_ISSUER = 'https://auth.hackclub.com';
const AUTH_ENDPOINT = `${HACKCLUB_ISSUER}/oauth/authorize`;
const TOKEN_ENDPOINT = `${HACKCLUB_ISSUER}/oauth/token`;
const USERINFO_ENDPOINT = `${HACKCLUB_ISSUER}/oauth/userinfo`;

const USER_TABLE = 'Users';
const SESSION_TABLE = 'Sessions';

const cookiesSchema = z.object({
	session: z.string().optional(),
	oauth_state: z.string().optional()
});

const hackClubProfileSchema = z.object({
	sub: z.string(),
	name: z.string().nullable().optional(),
	email: z.email().nullable().optional(),
	picture: z.url().nullable().optional(),
	slack_id: z.string().nullable().optional(),
	verification_status: z.string().nullable().optional()
});

const userSchema = z.object({
	hackclubId: z.string(),
	email: z.email().nullable().optional(),
	name: z.string().nullable().optional(),
	currency: z.number(),
	avatarUrl: z.url().nullable().optional(),
	slackId: z.string().nullable().optional(),
	verificationStatus: z.string().nullable().optional(),
	createdAt: z.string(),
	updatedAt: z.string()
});

const sessionSchema = z.object({
	userId: z.string(),
	tokenHash: z.string(),
	expiresAt: z.string(),
	createdAt: z.string()
});

const usersTable = defineAirtableTable({
	baseId: env.AIRTABLE_BASE_ID,
	tableName: USER_TABLE,
	schema: userSchema
});

const sessionsTable = defineAirtableTable({
	baseId: env.AIRTABLE_BASE_ID,
	tableName: SESSION_TABLE,
	schema: sessionSchema
});

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

const nowIso = () => new Date().toISOString();

const addDays = (days: number) => {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString();
};

const normalizeUrl = (url: string) => url.replace(/\/$/, '');

export const buildAuthUrl = (origin: string, state: string) => {
	const params = new URLSearchParams({
		client_id: env.HACKCLUB_CLIENT_ID,
		redirect_uri: `${normalizeUrl(origin)}/auth/callback`,
		response_type: 'code',
		scope: OAUTH_SCOPES.join(' '),
		state
	});

	return `${AUTH_ENDPOINT}?${params.toString()}`;
};

export const generateState = () => randomBytes(16).toString('hex');

const exchangeToken = async (origin: string, code: string) => {
	const params = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: `${normalizeUrl(origin)}/auth/callback`,
		client_id: env.HACKCLUB_CLIENT_ID,
		client_secret: env.HACKCLUB_CLIENT_SECRET
	});

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	});

	if (!response.ok) {
		throw new Error('Failed to exchange OAuth code');
	}

	return (await response.json()) as { access_token: string };
};

const fetchProfile = async (accessToken: string) => {
	const response = await fetch(USERINFO_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch Hack Club profile');
	}

	const payload = await response.json();
	return hackClubProfileSchema.parse(payload);
};

const upsertUser = async (profile: z.infer<typeof hackClubProfileSchema>) => {
	const existing = await usersTable.findOne({ and: [{ field: 'hackclubId', value: profile.sub }] });
	const timestamp = nowIso();

	if (existing) {
		return usersTable.update(existing.id, {
			name: profile.name ?? null,
			email: profile.email ?? null,
			avatarUrl: profile.picture ?? null,
			slackId: profile.slack_id ?? null,
			verificationStatus: profile.verification_status ?? null,
			updatedAt: timestamp
		});
	}

	return usersTable.create({
		hackclubId: profile.sub,
		name: profile.name ?? null,
		currency: 0,
		email: profile.email ?? null,
		avatarUrl: profile.picture ?? null,
		slackId: profile.slack_id ?? null,
		verificationStatus: profile.verification_status ?? null,
		createdAt: timestamp,
		updatedAt: timestamp
	});
};

export const createSession = async (userId: string) => {
	const token = randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const session = await sessionsTable.create({
		userId,
		tokenHash,
		expiresAt: addDays(14),
		createdAt: nowIso()
	});

	return { token, session };
};

export const getSession = async (token: string) => {
	const tokenHash = hashToken(token);
	const record = await sessionsTable.findOne({ and: [{ field: 'tokenHash', value: tokenHash }] });

	if (!record) {
		return null;
	}

	const expiresAt = new Date(String(record.expiresAt));
	if (Number.isNaN(expiresAt.getTime()) || expiresAt < new Date()) {
		await sessionsTable.remove(record.id);
		return null;
	}

	return record;
};

export const deleteSession = async (token: string) => {
	const tokenHash = hashToken(token);
	const record = await sessionsTable.findOne({ and: [{ field: 'tokenHash', value: tokenHash }] });
	if (record) {
		await sessionsTable.remove(record.id);
	}
};

export const clearSessionCookie = (cookies: {
	delete: (name: string, options: { path: string }) => void;
}) => {
	cookies.delete('session', { path: '/' });
};

export const setSessionCookie = (
	cookies: {
		set: (
			name: string,
			value: string,
			options: { path: string; httpOnly: boolean; secure: boolean; sameSite: 'lax'; maxAge: number }
		) => void;
	},
	token: string
) => {
	cookies.set('session', token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 14
	});
};

export const getCookies = (cookies: Record<string, string | undefined>) =>
	cookiesSchema.parse(cookies);

export const handleAuthCallback = async (origin: string, code: string) => {
	const tokenResponse = await exchangeToken(origin, code);
	const profile = await fetchProfile(tokenResponse.access_token);
	const user = await upsertUser(profile);
	const session = await createSession(user.id);
	return { user, sessionToken: session.token };
};

export const getUserById = async (id: string) => usersTable.findById(id);

export type AuthUser = z.infer<typeof userSchema> & { id: string };
