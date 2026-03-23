import z from 'zod';
import * as environment from '$env/dynamic/private';

const schema = z.object({
	AIRTABLE_BASE_ID: z.string().nonempty(),
	AIRTABLE_PAT: z.string().nonempty(),
	HACKCLUB_CLIENT_ID: z.string().nonempty(),
	HACKCLUB_CLIENT_SECRET: z.string().nonempty()
});

const parsed = schema.safeParse({
	AIRTABLE_BASE_ID: environment.env.AIRTABLE_BASE_ID,
	AIRTABLE_PAT: environment.env.AIRTABLE_PAT,
	HACKCLUB_CLIENT_ID: environment.env.HACKCLUB_CLIENT_ID,
	HACKCLUB_CLIENT_SECRET: environment.env.HACKCLUB_CLIENT_SECRET
});

if (!parsed.success) {
	console.error('Failed to validate env: ', parsed.error);
	process.exit(1);
}

export const env = parsed.data;
