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
		class="sticky top-0 w-72 bg-claude-bg/50 backdrop-blur-sm border border-claude-muted/20 rounded-xl m-2 p-6 max-md:hidden"
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
	<main class="flex-1 p-8 max-md:p-4">
		<nav
			class="md:hidden mb-6 -mx-4 px-4 overflow-x-auto flex gap-2 pb-2 border-b border-claude-muted/20"
		>
			<a
				href={resolve('/legenda')}
				class="whitespace-nowrap text-sm font-semibold text-claude-accent shrink-0">← Legenda</a
			>
			{#each items as item (items.indexOf(item))}
				<a
					href={item.href}
					class="whitespace-nowrap shrink-0 rounded-lg px-2 py-1 text-sm transition-colors hover:bg-claude-muted/10"
					>{item.label}</a
				>
			{/each}
		</nav>
		{@render children()}
	</main>
</div>
