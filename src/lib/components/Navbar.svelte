<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	let {
		appName,
		registerEnabled,
		user
	}: {
		appName: string;
		registerEnabled: boolean;
		user: { id: string; username: string } | null;
	} = $props();
	let isLegenda = $derived($page.url.pathname.startsWith('/legenda/'));
</script>

<nav
	class="fixed top-4 z-50 flex font-body transition-[left] duration-75 {isLegenda
		? 'left-480 right-0'
		: 'left-0 right-0'} justify-center"
>
	<div
		class="flex h-12 items-center justify-between gap-6 rounded-full border border-white/20 bg-white/50 px-5 shadow-lg shadow-black/5 backdrop-blur-2xl min-w-[500px]"
	>
		<a href={resolve('/')} class="text-sm font-semibold tracking-tight">{appName}</a>

		<div class="flex items-center gap-2">
			{#if user}
				<span class="text-xs text-gray-500">{user.username}</span>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="rounded-full px-3 py-1 text-xs text-gray-500 transition-colors hover:bg-black/5"
					>
						Sign out
					</button>
				</form>
			{:else}
				<a
					href={resolve('/login')}
					class="rounded-full px-3 py-1 text-xs text-gray-500 transition-colors hover:bg-black/5"
				>
					Sign in
				</a>
				{#if registerEnabled}
					<a
						href={resolve('/register')}
						class="rounded-full bg-claude-accent px-3 py-1 text-xs text-white transition-colors hover:brightness-110"
					>
						Register
					</a>
				{/if}
			{/if}
		</div>
	</div>
</nav>
