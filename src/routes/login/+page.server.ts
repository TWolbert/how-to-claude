import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { verifyPassword, createSession } from '$lib/server/auth';

export function load() {
	return {
		registerEnabled: env.AUTH_REGISTER_ENABLED === 'true'
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username || !password) {
			return fail(400, { error: 'Username and password are required' });
		}

		const [found] = await db.select().from(user).where(eq(user.username, username));
		if (!found || !verifyPassword(password, found.password)) {
			return fail(400, { error: 'Invalid username or password' });
		}

		const sessionToken = await createSession(found.id);
		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/');
	}
};
