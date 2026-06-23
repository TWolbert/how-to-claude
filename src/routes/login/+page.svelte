<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	let { data, form } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center px-4">
	<h1 class="mb-8 text-4xl font-bold font-heading">
		<span class="text-claude-accent">Log</span> in
	</h1>

	<form
		method="POST"
		use:enhance
		class="w-full max-w-md space-y-4 bg-claude-bg/20 backdrop-blur-sm border border-claude-accent/30 rounded-xl shadow-md p-3"
	>
		{#if form?.error}
			<p class="text-sm text-claude-accent">{form.error}</p>
		{/if}

		<div>
			<label for="username" class="block text-sm font-medium text-claude-muted">Username</label>
			<input
				id="username"
				name="username"
				type="text"
				required
				class="mt-1 block w-full rounded-xl border border-claude-muted/20 bg-claude-surface px-3 py-2 text-sm shadow-md backdrop-blur-lg focus:border-claude-accent focus:ring-1 focus:ring-claude-accent"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-claude-muted">Wachtwoord</label>
			<input
				id="password"
				name="password"
				type="password"
				required
				class="mt-1 block w-full rounded-xl border border-claude-muted/20 bg-claude-surface px-3 py-2 text-sm shadow-md backdrop-blur-lg focus:border-claude-accent focus:ring-1 focus:ring-claude-accent"
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded-xl bg-claude-accent px-4 py-2 text-sm font-medium text-claude-bg shadow-md backdrop-blur-lg"
		>
			Log in
		</button>
	</form>

	{#if data.registerEnabled}
		<p class="mt-6 text-center text-sm text-claude-muted">
			Geen account?
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolve('/register')} class="text-claude-accent hover:text-claude-accent"
				>Registreer</a
			>
		</p>
	{/if}
</div>
