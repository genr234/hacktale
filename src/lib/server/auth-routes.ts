import type { RequestEvent } from '@sveltejs/kit';
import {
	buildAuthUrl,
	clearSessionCookie,
	generateState,
	getCookies,
	handleAuthCallback,
	setSessionCookie
} from '$lib/server/auth';

const cookieOptions = {
	path: '/',
	httpOnly: true,
	secure: true,
	sameSite: 'lax' as const,
	maxAge: 60 * 10
};

export const getLoginResponse = (event: RequestEvent) => {
	const state = generateState();
	event.cookies.set('oauth_state', state, cookieOptions);
	return new Response(null, {
		status: 302,
		headers: {
			location: buildAuthUrl(event.url.origin, state)
		}
	});
};

export const getCallbackResponse = async (event: RequestEvent) => {
	const { state, code } = Object.fromEntries(event.url.searchParams);
	const cookies = getCookies(
		event.cookies.getAll().reduce<Record<string, string>>((acc, cookie) => {
			acc[cookie.name] = cookie.value;
			return acc;
		}, {})
	);

	if (!state || !code || !cookies.oauth_state || state !== cookies.oauth_state) {
		return new Response('Invalid auth state', { status: 400 });
	}

	event.cookies.delete('oauth_state', { path: '/' });
	const { sessionToken } = await handleAuthCallback(event.url.origin, code);
	setSessionCookie(event.cookies, sessionToken);
	return new Response(null, {
		status: 302,
		headers: {
			location: '/'
		}
	});
};

export const getLogoutResponse = (event: RequestEvent) => {
	clearSessionCookie(event.cookies);
	return new Response(null, {
		status: 302,
		headers: {
			location: '/'
		}
	});
};
