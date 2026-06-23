<h1 class="mb-4 text-3xl font-bold font-heading"><span class="text-claude-accent">Skills</span></h1>
<h2 class="font-bold text-xl">Dus wat is een Claude skill?</h2>
<p>
	Een claude skill is essentieel een <code>.md</code> bestand wat jouw AI leest voordat hij instructies
	uitvoert. Dit kunnen simpele instructies zijn zoals "Gebruik altijd X font op Y font-grootte" of complexe
	instructies zoals design documentaties
</p>

<h2 class="mt-8 font-bold text-xl">Een skill installeren in Claude</h2>
<p class="mt-2">
	Je voegt een skill toe via een speciale map in je project: <code class="font-mono"
		>.claude/skills/</code
	>. Plaats hier een <code class="font-mono">.md</code> bestand met je instructies en Claude laadt deze
	automatisch in.
</p>

<h3 class="mt-6 font-bold text-lg">Stappenplan</h3>
<ol class="mt-2 ml-6 list-decimal space-y-2">
	<li>Maak een <code class="font-mono">.claude</code> map aan in de root van je project.</li>
	<li>Maak daarin een <code class="font-mono">skills</code> map aan.</li>
	<li>
		Plaats een <code class="font-mono">.md</code> bestand met je instructies in
		<code class="font-mono">.claude/skills/</code>.
	</li>
	<li>Claude leest het bestand automatisch bij de volgende interactie.</li>
</ol>

<p class="mt-4">
	Je kan meerdere skills toevoegen in de map en ze worden allemaal ingeladen. Dit is handig voor
	project-specifieke afspraken zoals code conventies, commit-stijl of welke libraries je gebruikt.
</p>

<h2 class="font-bold text-xl mt-4">Nuttige skills:</h2>
<ul class="mt-2 space-y-2">
	<li>
		UI-UX Pro Max —
		<a
			class="text-blue-400 underline"
			href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
			>github.com/nextlevelbuilder/ui-ux-pro-max-skill</a
		>
		— Maak echt mooie UIs in weinig tijd.
	</li>
	<li>
		Codebase Expert —
		<a class="text-blue-400 underline" href="https://github.com/codegenixdev/claude-codebase-expert"
			>github.com/codegenixdev/claude-codebase-expert</a
		>
		— helpt Claude om grote codebases beter te navigeren.
	</li>
	<li>
		Testing Suite —
		<a
			class="text-blue-400 underline"
			href="https://github.com/nicholasgriffintn/testing-suite-skill"
			>github.com/nicholasgriffintn/testing-suite-skill</a
		>
		— schrijft tests volgens jouw project standaarden.
	</li>
	<li>
		Accessibility Checker —
		<a
			class="text-blue-400 underline"
			href="https://github.com/alexsideris/accessibility-checker-skill"
			>github.com/alexsideris/accessibility-checker-skill</a
		>
		— controleert of componenten voldoen aan WCAG richtlijnen.
	</li>
	<li>
		Git Whisperer —
		<a class="text-blue-400 underline" href="https://github.com/jasonfalkowski/git-whisperer"
			>github.com/jasonfalkowski/git-whisperer</a
		>
		— schrijft duidelijke commit messages en helpt met git workflows.
	</li>
</ul>
