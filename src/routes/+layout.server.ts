import { env } from '$env/dynamic/private';

export function load({ locals }) {
	return {
		appName: env.APP_NAME ?? 'How to Claude',
		registerEnabled: env.AUTH_REGISTER_ENABLED === 'true',
		user: locals.user ?? null
	};
}
