import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const PROJECT_ROOT = process.cwd();
const LEGENDA_DIR = resolve(PROJECT_ROOT, 'src/routes/legenda');

const PAGE_TITLES: Record<string, string> = {
	'/legenda': 'Legenda overzicht',
	'/legenda/skills': 'Skills',
	'/legenda/mcp': 'MCP',
	'/legenda/context-windows': 'Context Windows',
	'/legenda/claude-interactie-met-je-server': 'Claude interactie met je server',
	'/legenda/hoe-weet-ik-nou-of-claude-goede-code-schrijft': 'Hoe weet ik nou of Claude goede code schrijft?'
};

function readSveltePage(pagePath: string): string {
	const fullPath = resolve(PROJECT_ROOT, 'src/routes', pagePath.slice(1), '+page.svelte');
	if (!fullPath.startsWith(PROJECT_ROOT)) {
		throw new Error('Toegang geweigerd');
	}
	const raw = readFileSync(fullPath, 'utf-8');
	const stripped = raw
		.replace(/<script[\s\S]*?<\/script>/, '')
		.replace(/<[^>]+>/g, '')
		.replace(/&lt;!--.*?--&gt;/g, '')
		.replace(/&#123;/g, '{')
		.replace(/&#125;/g, '}')
		.replace(/\s+/g, ' ')
		.trim();
	return stripped;
}

export function createMcpServer() {
	const server = new McpServer({
		name: 'how-to-claude',
		version: '0.0.1'
	});

	server.tool(
		'read_legenda_page',
		'Lees de inhoud van een Legenda instructiepagina',
		{
			page: z.string().describe('Pad van de pagina, bv. /legenda/skills of /legenda/mcp')
		},
		async ({ page }) => {
			if (!page.startsWith('/legenda')) {
				return { content: [{ type: 'text' as const, text: 'Alleen /legenda/* pagina\'s zijn toegankelijk' }], isError: true };
			}
			if (!PAGE_TITLES[page]) {
				return { content: [{ type: 'text' as const, text: `Pagina "${page}" niet gevonden` }], isError: true };
			}
			try {
				const title = PAGE_TITLES[page];
				const text = readSveltePage(page);
				return {
					content: [{ type: 'text' as const, text: `# ${title}\n\n${text}` }]
				};
			} catch (e) {
				return {
					content: [{ type: 'text' as const, text: `Fout bij lezen van ${page}: ${e}` }],
					isError: true
				};
			}
		}
	);

	server.tool(
		'list_legenda_pages',
		'Lijst alle beschikbare Legenda instructiepagina\'s',
		{},
		async () => {
			const entries = Object.entries(PAGE_TITLES);
			const lines = entries.map(([path, title]) => `${path} — ${title}`);
			return {
				content: [{ type: 'text' as const, text: lines.join('\n') }]
			};
		}
	);

	return server;
}
