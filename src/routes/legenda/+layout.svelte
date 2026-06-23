<script lang="ts">
	import { resolve } from '$app/paths';
	let { children } = $props();

	const items = [
		{ label: 'Skills', href: resolve('/legenda/skills') },
		{ label: 'MCP', href: resolve('/legenda/mcp') },
		{ label: 'Context Windows', href: resolve('/legenda/context-windows') },
		{
			label: 'Claude interactie met je server',
			href: resolve('/legenda/claude-interactie-met-je-server')
		},
		{
			label: 'Hoe weet ik nou of Claude goede code schrijft?',
			href: resolve('/legenda/hoe-weet-ik-nou-of-claude-goede-code-schrijft')
		}
	];
</script>

<div class="flex min-h-screen">
	<aside
		class="sticky top-0 w-72 bg-claude-bg/50 backdrop-blur-sm border border-claude-muted/20 rounded-xl m-2 p-6"
	>
		<a href={resolve('/')} class="mb-8 block text-sm font-semibold tracking-tight">← Home</a>
		<a href={resolve('/legenda')} class="mb-4 text-lg font-bold font-heading text-claude-accent"
			>> Legenda</a
		>
		<ul class="space-y-2">
			{#each items as item (items.indexOf(item))}
				<li>
					<a
						href={item.href}
						class="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-claude-muted/10"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<main class="flex-1 p-8">
		{@render children()}
	</main>
</div>
