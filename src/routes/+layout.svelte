<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import IconGrid from '$lib/components/IconGrid.svelte';
	let { data, children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Navbar appName={data.appName} registerEnabled={data.registerEnabled} user={data.user} />
<div class="relative min-h-screen bg-claude-bg text-claude-fg">
	<IconGrid />
	<main class="relative z-20 font-body">
		{@render children()}
	</main>
</div>
