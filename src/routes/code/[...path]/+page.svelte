<script lang="ts">
	import hljs from 'highlight.js';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let { data } = $props();

	let codeEl: HTMLElement | undefined = $state();

	onMount(() => {
		if (codeEl) {
			hljs.highlightElement(codeEl);
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css" />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-xl font-bold font-heading">
			<span class="text-claude-accent">{data.filename}</span>
		</h1>
		<a
			href={resolve('/legenda/hoe-weet-ik-nou-of-claude-goede-code-schrijft')}
			class="rounded-full px-3 py-1 text-xs text-gray-500 transition-colors hover:bg-black/5"
		>
			&larr; Terug
		</a>
	</div>

	<div class="rounded-lg border border-claude-muted/20 bg-white/50 overflow-hidden">
		<div class="bg-black/5 px-4 py-2 text-xs text-claude-muted border-b border-claude-muted/20">
			{data.language}
		</div>
		<pre class="overflow-x-auto p-4 text-sm"><code bind:this={codeEl} class="language-{data.language}">{data.content}</code></pre>
	</div>
</div>
