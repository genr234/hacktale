import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

export const load = async ({ locals }) => {
	if (!locals.user) {
		goto(resolve('/'));
	}

	const user = locals.user;

	delete user?.email;

	return {
		user: user
	};
};
