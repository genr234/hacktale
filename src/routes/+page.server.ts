import { Prizes } from '$lib/server/tables/prizes.js';

export const load = async ({ locals }) => {
	const prizes = await Prizes.findMany({ cacheTtl: 60 * 1000 * 20 });

	return {
		authenticated: locals.user !== undefined,
		prizes: prizes
	};
};
