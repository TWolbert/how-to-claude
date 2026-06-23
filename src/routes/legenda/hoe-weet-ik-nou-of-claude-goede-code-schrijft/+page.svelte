<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<h1 class="mb-4 text-3xl font-bold font-heading">
	<span class="text-claude-accent">Hoe weet ik nou of Claude goede code schrijft?</span>
</h1>

<h2 class="font-bold text-xl">Het probleem</h2>
<p class="mt-2">
	Claude kan razendsnel code genereren, maar hoe weet je of die code ook <em>goed</em> is? Het oogt vaak
	overtuigend: comments kloppen, variabelenamen zijn logisch, de structuur ziet er netjes uit. Maar onder
	de motorkap kunnen er bugs zitten, slechte performance, of veiligheidslekken. Je hebt objectieve verificatie
	nodig.
</p>

<h2 class="mt-8 font-bold text-xl">CodeRabbit: AI code review op PRs</h2>
<p class="mt-2">
	CodeRabbit is een AI-reviewer die je aan GitHub koppelt. Bij elke pull request analyseert hij de
	diff, wijst op problemen en stelt verbeteringen voor. Het werkt taalonafhankelijk en vangt dingen
	die een menselijke reviewer makkelijk over het hoofd ziet, zoals inconsistente foutafhandeling of
	vergeten edge cases.
</p>
<p class="mt-2">
	Je installeert het via de <a
		class="text-blue-400 underline"
		href="https://github.com/marketplace/coderabbit">GitHub Marketplace</a
	>. Let op: CodeRabbit werkt alleen voor GitHub-repo's, niet voor GitLab of Bitbucket. Het is
	gratis voor publieke repo's en betaald voor priv&eacute;-repo's. CodeRabbit draait automatisch bij
	elke PR en plaatst comments op de relevante regels.
</p>

<h3 class="mt-4 font-bold text-lg">Wat CodeRabbit checkt</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>Logische fouten en edge cases die de AI over het hoofd heeft gezien.</li>
	<li>Security issues (SQL injectie, XSS, hardcoded secrets).</li>
	<li>Code stijl en consistentie met de rest van de codebase.</li>
	<li>Performance bottlenecks en onnodige complexiteit.</li>
	<li>Ontbrekende of foutieve foutafhandeling.</li>
</ul>

<h2 class="mt-8 font-bold text-xl">Self-review skill: laat Claude zijn eigen code reviewen</h2>
<p class="mt-2">
	Je kan een Claude skill maken die Claude dwingt om zijn eigen output te reviewen voordat hij het
	presenteert. Maak een bestand <code class="font-mono">.claude/skills/self-review.md</code>:
</p>
<pre
	class="mt-2 overflow-x-auto rounded-lg border border-claude-muted/20 bg-black/5 p-4 text-sm"># Self-review skill

Voordat je code presenteert, doorloop je deze checklist:

1. **Draait het?** Controleer of de code uitvoerbaar is zonder syntaxfouten.
2. **Edge cases** Wat gebeurt er bij lege input, null-waardes of onverwachte types?
3. **Security** Staan er geen secrets, SQL-injecties of open redirects in?
4. **Performance** Zit er onnodige nesting, dure loops of N+1 queries in?
5. **Consistentie** Past de code bij de stijl en conventies van de rest van het project?
6. **Foutafhandeling** Worden fouten netjes afgevangen en gerapporteerd?

Pas nadat je alle punten hebt gecheckt en verbeterd, toon je de code aan de gebruiker.
Vermeld in je antwoord welke punten je hebt aangepast.</pre>
<p class="mt-2">
	Claude leest deze skill aan het begin van elke sessie en past zijn gedrag aan. Het is een simpele
	maar effectieve manier om de kwaliteit van gegenereerde code te verhogen.
</p>

<h2 class="mt-8 font-bold text-xl">Benchmark: Python vs Go Fiber</h2>
<p class="mt-2">
	Claude heeft jouw website voor homeassistant heeft geschreven met een Python HTTP backend (<code
		class="font-mono">http.server</code
	>). Hoe presteert die code in vergelijking met een equivalente implementatie in Go met Fiber? Het
	verschil is verrassend groot.
</p>

<h3 class="mt-4 font-bold text-lg">De servers</h3>
<p class="mt-2">
	Twee minimale API-servers met elk twee endpoints (<code class="font-mono">/api/hello</code> en
	<code class="font-mono">/api/data</code>):
</p>
<div class="overflow-x-auto">
<table class="mt-2 w-full border-collapse text-sm">
	<thead>
		<tr class="border-b border-claude-muted/20 text-left">
			<th class="p-2 font-semibold">Aspect</th>
			<th class="p-2 font-semibold">Python (http.server)</th>
			<th class="p-2 font-semibold">Go (Fiber)</th>
		</tr>
	</thead>
	<tbody>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Code</td>
			<td class="p-2"
				><a class="text-blue-400 underline" href={resolve('/code/benchmark/python_server.py')}
					>benchmark/python_server.py</a
				></td
			>
			<td class="p-2"
				><a class="text-blue-400 underline" href={resolve('/code/benchmark/go_server.go')}
					>benchmark/go_server.go</a
				></td
			>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Regels code</td>
			<td class="p-2">~30</td>
			<td class="p-2">~25</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Geheugen idle</td>
			<td class="p-2">~12 MB</td>
			<td class="p-2">~3 MB</td>
		</tr>
	</tbody>
</table>
</div>

<h3 class="mt-4 font-bold text-lg">Benchmark resultaten</h3>
<p class="mt-2">
	Gemeten met <code class="font-mono">wrk</code> (50K requests, 100 concurrent clients, 30 seconden):
</p>
<div class="overflow-x-auto">
<table class="mt-2 w-full border-collapse text-sm">
	<thead>
		<tr class="border-b border-claude-muted/20 text-left">
			<th class="p-2 font-semibold">Endpoint</th>
			<th class="p-2 font-semibold">Python</th>
			<th class="p-2 font-semibold">Go (Fiber)</th>
			<th class="p-2 font-semibold">Verschil</th>
		</tr>
	</thead>
	<tbody>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2"><code class="font-mono">/api/hello</code></td>
			<td class="p-2">1.200 req/s</td>
			<td class="p-2">78.000 req/s</td>
			<td class="p-2"><strong>65x sneller</strong></td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2"><code class="font-mono">/api/data</code></td>
			<td class="p-2">950 req/s</td>
			<td class="p-2">52.000 req/s</td>
			<td class="p-2"><strong>55x sneller</strong></td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Latency (p95)</td>
			<td class="p-2">~120 ms</td>
			<td class="p-2">~2 ms</td>
			<td class="p-2"><strong>60x lager</strong></td>
		</tr>
	</tbody>
</table>
</div>

<h3 class="mt-4 font-bold text-lg">Wat zegt dit?</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		<strong>Python is prima voor prototypes, interne tools of low-traffic sites.</strong> De code is leesbaar,
		snel geschreven en makkelijk aan te passen.
	</li>
	<li>
		<strong>Go/Fiber is nodig voor productie onder hoge belasting.</strong> Als je tienduizenden verzoeken
		per seconde verwacht, kan Python simpelweg niet bijbenen.
	</li>
	<li>
		<strong>Claude kan beide.</strong> De kwaliteit van de code is niet het probleem, maar de keuze van
		de juiste taal voor de juiste taak is minstens zo belangrijk.
	</li>
</ul>
<p class="mt-2 text-xs text-claude-muted">
	Zelf draaien? Vraag Teun even om het project voor je lokaal te pullen: <code class="font-mono"
		>cd benchmark && ./run.sh</code
	> (vereist Go, Python 3 en wrk ge&iuml;nstalleerd).
</p>

<h2 class="mt-8 font-bold text-xl">Andere manieren om kwaliteit te checken</h2>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		<strong>Unit tests.</strong> Laat Claude zelf de tests schrijven voordat hij de implementatie maakt.
		Dat dwingt hem om over randgevallen na te denken.
	</li>
	<li>
		<strong>Type checking.</strong> Draai <code class="font-mono">mypy</code> (Python),
		<code class="font-mono">tsc --noEmit</code>
		(TypeScript) of <code class="font-mono">go vet</code> (Go) over gegenereerde code.
	</li>
	<li>
		<strong>Linters.</strong> <code class="font-mono">ruff</code>,
		<code class="font-mono">eslint</code>
		of <code class="font-mono">golangci-lint</code> vangen stijlproblemen en potenti&euml;le bugs.
	</li>
	<li>
		<strong>Security scanners.</strong> Tools zoals <code class="font-mono">bandit</code> (Python)
		of <code class="font-mono">gosec</code> (Go) zoeken naar kwetsbaarheden.
	</li>
	<li>
		<strong>Peer review.</strong> Laat een collega naar de code kijken. AI is goed, maar mist context
		over het bedrijf, de gebruikers en ongeschreven regels.
	</li>
</ul>
