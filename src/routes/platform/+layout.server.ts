export const load = async ({ locals }) => {
	const user = locals.user;

	delete user?.email;

	return {
		user: user
	};
};
