import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { hashPassword, createSession } from '$lib/server/auth';

export function load() {
	if (env.AUTH_REGISTER_ENABLED !== 'true') {
		throw redirect(302, '/login');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		if (env.AUTH_REGISTER_ENABLED !== 'true') {
			return fail(403, { error: 'Registration is disabled' });
		}

		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		if (!username || !password || !confirmPassword) {
			return fail(400, { error: 'All fields are required' });
		}

		if (password !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match' });
		}

		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters' });
		}

		const [existing] = await db.select().from(user).where(eq(user.username, username));
		if (existing) {
			return fail(400, { error: 'Username already taken' });
		}

		const [created] = await db
			.insert(user)
			.values({ username, password: hashPassword(password) })
			.returning();

		const sessionToken = await createSession(created.id);
		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(302, '/');
	}
};
