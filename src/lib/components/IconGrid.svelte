<script lang="ts">
	import {
		SiClaude,
		SiAnthropic,
		SiGit,
		SiJavascript,
		SiHtml5,
		SiCss,
		SiTypescript,
		SiSvelte,
		SiReact,
		SiNodedotjs,
		SiTailwindcss,
		SiVite
	} from '@icons-pack/svelte-simple-icons';

	const ICONS = [
		SiClaude,
		SiAnthropic,
		SiGit,
		SiJavascript,
		SiHtml5,
		SiCss,
		SiTypescript,
		SiSvelte,
		SiReact,
		SiNodedotjs,
		SiTailwindcss,
		SiVite
	];
	const random = (() => {
		let seed = 42;
		return () => {
			seed = (seed * 16807 + 0) % 2147483647;
			return seed / 2147483647;
		};
	})();

	const rows = Array.from({ length: 20 }, (_, ri) => ({
		offset: ri % 2 === 1,
		icons: Array.from({ length: 20 }, () => ICONS[Math.floor(random() * ICONS.length)])
	}));
</script>

<div class="pointer-events-none fixed inset-0 z-0 max-md:hidden">
	<div class="flex flex-col gap-24" style="transform: rotate(-12deg) scale(1.4) translateY(-10%);">
		{#each rows as row, ri (ri)}
			<div class="flex gap-24" class:ml-32={row.offset}>
				{#each row.icons as Icon, ci (ci)}
					<Icon class="size-14 text-claude-fg/15" />
				{/each}
			</div>
		{/each}
	</div>
</div>
