import { scryptSync, randomUUID } from 'crypto';
import { db } from './db';
import { user, token } from './db/schema';
import { eq } from 'drizzle-orm';

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
	const salt = randomUUID().slice(0, 16);
	const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
	const [salt, hash] = stored.split(':');
	const derived = scryptSync(password, salt, KEY_LENGTH).toString('hex');
	const derivedBuf = Buffer.from(derived);
	const hashBuf = Buffer.from(hash);
	if (derivedBuf.length !== hashBuf.length) return false;
	return scryptSync(password, salt, KEY_LENGTH).toString('hex') === hash;
}

export async function createSession(userId: string): Promise<string> {
	const sessionToken = randomUUID();
	await db.insert(token).values({ id: sessionToken, user_id: userId });
	return sessionToken;
}

export async function getSession(
	sessionToken: string
): Promise<{ id: string; username: string } | null> {
	const [found] = await db
		.select({ id: user.id, username: user.username })
		.from(token)
		.innerJoin(user, eq(token.user_id, user.id))
		.where(eq(token.id, sessionToken));
	return found ?? null;
}

export async function deleteSession(sessionToken: string): Promise<void> {
	await db.delete(token).where(eq(token.id, sessionToken));
}
