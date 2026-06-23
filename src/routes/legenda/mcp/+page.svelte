<h1 class="mb-4 text-3xl font-bold font-heading"><span class="text-claude-accent">MCP</span></h1>
<h2 class="font-bold text-xl">Wat is MCP?</h2>
<p class="mt-2">
	MCP (Model Context Protocol) is een open protocol waarmee je Claude tools en data uit externe
	services kan geven. Denk aan database queries, bestandssysteem toegang, of API calls — allemaal
	rechtstreeks vanuit je chat.
</p>

<h2 class="mt-8 font-bold text-xl">De MCP server van dit project</h2>
<p class="mt-2">Dit project heeft een eigen MCP server met de volgende tools:</p>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		<strong>list_legenda_pages</strong> — toon alle beschikbare Legenda instructiepagina's.
	</li>
	<li>
		<strong>read_legenda_page</strong> — lees de volledige inhoud van een Legenda pagina (bijv.
		<code class="font-mono">/legenda/skills</code>).
	</li>
</ul>

<h2 class="mt-8 font-bold text-xl">Lokaal via stdio</h2>
<p class="mt-2">
	De makkelijkste manier om de MCP server te gebruiken is via stdio. Voeg dit toe aan je
	<code class="font-mono">.mcp.json</code> in de project root:
</p>
<pre
	class="mt-2 overflow-x-auto rounded-lg border border-claude-muted/20 bg-black/5 p-4 text-sm">&#123;&#123;
	"mcpServers": &#123;&#123;
		"how-to-claude": &#123;&#123;
			"command": "npx",
			"args": ["tsx", "src/mcp/server.ts"]
		&#125;&#125;
	&#125;&#125;
&#125;&#125;</pre>

<h2 class="mt-8 font-bold text-xl">Via HTTP (claude.wlbt.nl)</h2>
<p class="mt-2">
	Als de site live staat op <code class="font-mono">claude.wlbt.nl</code>, kan je de MCP server ook
	via HTTP benaderen:
</p>
<pre
	class="mt-2 overflow-x-auto rounded-lg border border-claude-muted/20 bg-black/5 p-4 text-sm">&#123;&#123;
	"mcpServers": &#123;&#123;
		"how-to-claude": &#123;&#123;
			"type": "http",
			"url": "https://claude.wlbt.nl/mcp"
		&#125;&#125;
	&#125;&#125;
&#125;&#125;</pre>

<h2 class="mt-8 font-bold text-xl">Hoe het werkt</h2>
<p class="mt-2">
	Zodra de MCP server is geconfigureerd, kan Claude tijdens een gesprek tools aanroepen. Dit gebeurt
	automatisch wanneer Claude denkt dat een tool nuttig is — je hoeft niets handmatig te doen.
</p>

<h2 class="mt-8 font-bold text-xl">MCP servers in dit project</h2>
<p class="mt-2">Dit project gebruikt op dit moment de volgende MCP servers:</p>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		<strong>Svelte Docs</strong> — <code class="font-mono">https://mcp.svelte.dev/mcp</code>
		— geeft Claude toegang tot de nieuwste Svelte 5 en SvelteKit documentatie.
	</li>
</ul>
