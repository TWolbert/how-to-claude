import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth';

export const actions = {
	default: async ({ cookies, locals }) => {
		const sessionToken = cookies.get('session');
		if (sessionToken) {
			await deleteSession(sessionToken);
			cookies.delete('session', { path: '/' });
		}
		locals.user = undefined;
		throw redirect(302, '/login');
	}
};
