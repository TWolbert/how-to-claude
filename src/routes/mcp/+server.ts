import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from '$lib/server/mcp';

const server = createMcpServer();

let transport: WebStandardStreamableHTTPServerTransport | null = null;

function getTransport() {
	if (!transport) {
		transport = new WebStandardStreamableHTTPServerTransport({
			sessionIdGenerator: () => crypto.randomUUID()
		});
		server.connect(transport);
	}
	return transport;
}

export async function GET({ request }: { request: Request }): Promise<Response> {
	return getTransport().handleRequest(request);
}

export async function POST({ request }: { request: Request }): Promise<Response> {
	return getTransport().handleRequest(request);
}
