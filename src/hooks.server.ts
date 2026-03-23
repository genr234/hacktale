import type { Handle } from '@sveltejs/kit';
import { getCookies, getSession, getUserById } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = getCookies(
		event.cookies.getAll().reduce<Record<string, string>>((acc, cookie) => {
			acc[cookie.name] = cookie.value;
			return acc;
		}, {})
	);

	if (cookies.session) {
		const session = await getSession(cookies.session);
		if (session) {
			const user = await getUserById(session.userId);
			if (user) {
				event.locals.user = user;
			}
		}
	}

	return resolve(event);
};
