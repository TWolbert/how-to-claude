<script lang="ts">
	import { resolve } from '$app/paths';
	let { data } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3">
	<h1 class="text-5xl font-bold font-heading">
		<span class="text-claude-accent">Claude</span> na je 50e, hoe navigeer je dat?
	</h1>
	<p>Leer hier over MCP, Claude skills, wat een 'context window' uberhaupt is, en meer.</p>
	<div class="flex gap-2">
		{#if data.user}
			<a
				class="rounded-xl bg-claude-accent px-3 py-2 text-claude-bg shadow-md backdrop-blur-lg"
				href={resolve('/legenda')}>Naar de Legenda</a
			>
		{:else}
			<a
				class="rounded-xl bg-claude-muted px-3 py-2 text-claude-bg shadow-md backdrop-blur-lg"
				href={resolve('/register')}>Maak een account aan.</a
			>
			<a
				class="rounded-xl bg-claude-accent px-3 py-2 text-claude-bg shadow-md backdrop-blur-lg"
				href={resolve('/login')}>Log in</a
			>
		{/if}
	</div>
</div>
