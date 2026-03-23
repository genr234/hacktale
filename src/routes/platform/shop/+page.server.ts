import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { Prizes } from '$lib/server/tables/prizes.js';

export const load = async ({ locals }) => {
	if (!locals.user) {
		goto(resolve('/'));
	}

	const items = await Prizes.findMany();
	const user = locals.user;

	delete user?.email;

	return {
		user: user,
		items: items
	};
};
