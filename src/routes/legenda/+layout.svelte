<script lang="ts">
	import { page } from '$app/stores';
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

	let isOnSubPage = $derived($page.url.pathname !== resolve('/legenda'));
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
	<main class="flex-1 p-8 max-md:p-4 max-md:pt-20">
		{#if isOnSubPage}
			<a
				href={resolve('/legenda')}
				class="md:hidden mb-6 flex items-center gap-1 text-sm font-semibold text-claude-accent"
			>
				← Legenda
			</a>
		{/if}

		{#if !isOnSubPage}
			<div class="md:hidden">
				<h1 class="mb-6 text-2xl font-bold font-heading">
					<span class="text-claude-accent">Legenda</span>
				</h1>
				<ul class="space-y-2">
					{#each items as item (items.indexOf(item))}
						<li>
							<a
								href={item.href}
								class="block rounded-lg border border-claude-muted/20 px-4 py-3 text-sm transition-colors hover:bg-claude-muted/10"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class:max-md:hidden={!isOnSubPage}>
			{@render children()}
		</div>
	</main>
</div>
