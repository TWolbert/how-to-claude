#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from '../lib/server/mcp.js';

async function main() {
	const server = createMcpServer();
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((e) => {
	console.error('MCP server error:', e);
	process.exit(1);
});
