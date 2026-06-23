import type { Handle } from '@sveltejs/kit';
import { getSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');
	if (sessionToken) {
		const sessionUser = await getSession(sessionToken);
		if (sessionUser) {
			event.locals.user = sessionUser;
		} else {
			event.cookies.delete('session', { path: '/' });
		}
	}
	return resolve(event);
};
