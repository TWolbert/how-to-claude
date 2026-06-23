import { readFileSync } from 'fs';
import { resolve } from 'path';
import { error } from '@sveltejs/kit';

const PROJECT_ROOT = process.cwd();
const ALLOWED_DIRS = ['benchmark'];

export function load({ params }: { params: { path: string } }) {
	const filePath = params.path;
	const fullPath = resolve(PROJECT_ROOT, filePath);

	if (!fullPath.startsWith(PROJECT_ROOT)) {
		error(403, 'Toegang geweigerd');
	}

	const allowed = ALLOWED_DIRS.some((dir) => fullPath.startsWith(resolve(PROJECT_ROOT, dir)));
	if (!allowed) {
		error(403, 'Toegang geweigerd');
	}

	try {
		const content = readFileSync(fullPath, 'utf-8');
		const ext = filePath.split('.').pop()?.toLowerCase() ?? '';
		const langMap: Record<string, string> = {
			py: 'python',
			go: 'go',
			sh: 'bash',
			ts: 'typescript',
			svelte: 'svelte'
		};
		return {
			content,
			language: langMap[ext] || ext,
			filename: filePath.split('/').pop() ?? filePath
		};
	} catch {
		error(404, 'Bestand niet gevonden');
	}
}
