<h1 class="mb-4 text-3xl font-bold font-heading">
	<span class="text-claude-accent">Claude interactie met je server</span>
</h1>

<h2 class="font-bold text-xl">Waarom zou je Claude op je server laten werken?</h2>
<p class="mt-2">
	Als je project draait op een server (VPS, dedicated of cloud instance) dan wil je dat Claude daar
	direct bij kan. Denk aan het debuggen van productieproblemen, het aanpassen van configuratie,
	of het draaien van database migraties. Er zijn twee manieren om dit te doen: via SSH of door
	Claude Code direct op de server te draaien.
</p>

<h2 class="mt-8 font-bold text-xl">SSH: Claude Code op je eigen machine, actie op de server</h2>
<p class="mt-2">
	Je draait Claude Code lokaal en geeft het SSH-toegang tot je server. Claude kan dan via SSH
	commando's uitvoeren, logs bekijken, bestanden aanpassen en services restarten.
</p>

<h3 class="mt-4 font-bold text-lg">Hoe het werkt</h3>
<p class="mt-2">Zet een SSH-sleutel klaar die Claude mag gebruiken en voeg dit toe aan je <code class="font-mono">.mcp.json</code> of geef het een SSH-commando via de chat:</p>
<pre class="mt-2 overflow-x-auto rounded-lg border border-claude-muted/20 bg-black/5 p-4 text-sm"><code>ssh -i ~/.ssh/server-key.pem gebruiker@jouw-server.nl</code></pre>
<p class="mt-2">Vanaf dat moment kan Claude inloggen en commando's uitvoeren op de server.</p>

<h3 class="mt-4 font-bold text-lg">Voordelen</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>Je lokale IDE en tools blijven beschikbaar.</li>
	<li>Claude kan meerdere servers beheren vanuit &eacute;&eacute;n sessie.</li>
	<li>Geen installatie op de server nodig, alleen een SSH-daemon.</li>
	<li>Makkelijk te auditen: alle SSH-actie staat in de logs.</li>
	<li>Je kan de verbinding op elk moment verbreken.</li>
</ul>

<h3 class="mt-4 font-bold text-lg">Nadelen</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>Afhankelijk van netwerk: bij een trage verbinding voelt het log aan.</li>
	<li>Bestanden bewerken gaat via SCP of directe SSH-commando's, wat omslachtig kan zijn.</li>
	<li>Geen toegang tot de server als die uit staat of het netwerk eruit ligt.</li>
	<li>SSH-sleutels beveiligen is extra verantwoordelijkheid.</li>
</ul>

<h2 class="mt-8 font-bold text-xl">Claude Code op de server</h2>
<p class="mt-2">
	Je installeert Claude Code rechtstreeks op de server en draait het daar via een terminal
	(Tmux of Screen). Dit is alsof je fysiek voor de server zit, maar dan met Claude als
	hulplijn.
</p>

<h3 class="mt-4 font-bold text-lg">Hoe het werkt</h3>
<ol class="mt-2 ml-6 list-decimal space-y-2">
	<li>SSH naar je server.</li>
	<li>Installeer Node.js als dat nog niet staat.</li>
	<li>Draai <code class="font-mono">npm install -g @anthropic-ai/claude-code</code>.</li>
	<li>Start een Tmux-sessie: <code class="font-mono">tmux new -s claude</code>.</li>
	<li>Draai <code class="font-mono">claude</code> in die sessie.</li>
	<li>Je kan de sessie loslaten (Ctrl+B, D) en later terugkomen met <code class="font-mono">tmux attach -t claude</code>.</li>
</ol>

<h3 class="mt-4 font-bold text-lg">Voordelen</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>Direct bestandssysteem: Claude kan alle bestanden op de server zien en wijzigen.</li>
	<li>Geen netwerk latency: alles draait lokaal op de server zelf.</li>
	<li>Werkt ook zonder internetverbinding van jouw kant (zolang de server online is).</li>
	<li>Makkelijker voor langlopende taken: Tmux houdt de sessie in leven.</li>
	<li>Claude heeft toegang tot alle servercommands en -tools.</li>
</ul>

<h3 class="mt-4 font-bold text-lg">Nadelen</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>API-key staat op de server, wat een veiligheidsrisico is als de server wordt gecompromitteerd.</li>
	<li>Geen lokale IDE: je mist syntax highlighting, linting en autocomplete tijdens het werken.</li>
	<li>Tmux/Screen vereist enige kennis van terminal-multiplexers.</li>
	<li>Je moet Node.js en de CLI installeren en up-to-date houden op de server.</li>
	<li>Bij een serverrestart moet je de sessie handmatig hervatten.</li>
</ul>

<h2 class="mt-8 font-bold text-xl">Vergelijking op een rijtje</h2>
<div class="overflow-x-auto">
<table class="mt-2 w-full border-collapse text-sm">
	<thead>
		<tr class="border-b border-claude-muted/20 text-left">
			<th class="p-2 font-semibold">Aspect</th>
			<th class="p-2 font-semibold">SSH</th>
			<th class="p-2 font-semibold">Claude Code op server</th>
		</tr>
	</thead>
	<tbody>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Installatie server</td>
			<td class="p-2">Geen</td>
			<td class="p-2">Node.js + Claude Code CLI</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Bestandstoegang</td>
			<td class="p-2">Via SCP/SSH-commando's</td>
			<td class="p-2">Direct (lokaal bestandssysteem)</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Snelheid</td>
			<td class="p-2">Afhankelijk van netwerk</td>
			<td class="p-2">Direct (geen latency)</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Lokale IDE</td>
			<td class="p-2">Ja</td>
			<td class="p-2">Nee</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">API-key risico</td>
			<td class="p-2">Laag (key blijft lokaal)</td>
			<td class="p-2">Hoger (key staat op server)</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Meerdere servers</td>
			<td class="p-2">Makkelijk</td>
			<td class="p-2">Per server aparte sessie</td>
		</tr>
		<tr class="border-b border-claude-muted/20">
			<td class="p-2">Langlopende taken</td>
			<td class="p-2">Sessie kan verbreken</td>
			<td class="p-2">Blijft draaien in Tmux</td>
		</tr>
	</tbody>
</table>
</div>

<h2 class="mt-8 font-bold text-xl">Welke kies je?</h2>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li><strong>SSH</strong> is de beste keuze als je snel iets wil checken op een server zonder gedoe, of als je meerdere servers beheert.</li>
	<li><strong>Claude Code op de server</strong> is beter als je langere sessies draait, grote bestanden bewerkt of als de server een afgelegen omgeving is met een trage uplink.</li>
</ul>
