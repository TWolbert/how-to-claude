<h1 class="mb-4 text-3xl font-bold font-heading">
	<span class="text-claude-accent">Context Windows</span>
</h1>

<h2 class="font-bold text-xl">Wat is een context window?</h2>
<p class="mt-2">
	De context window is het aantal tokens dat een LLM in &eacute;&eacute;n keer kan verwerken. Zie
	het als het werkgeheugen van de AI: alles wat je meestuurt: je instructie, bijlagen,
	conversatiegeschiedenis, moet binnen die limiet passen. Claude heeft een context van <strong
		>200K tokens</strong
	>
	(standaard) tot
	<strong>1M tokens</strong> (beta). GPT-4.1 zit op 128K, Gemini 2.5 Pro op 1M en Llama 4 Scout op 10M.
</p>

<h2 class="mt-8 font-bold text-xl">Groter &ne; beter</h2>
<p class="mt-2">
	Een grotere context window klinkt als een zegen, maar onderzoek laat zien dat modellen die extra
	ruimte niet effici&euml;nt benutten. Prestaties gaan <em>omgekeerd evenredig</em> achteruit
	naarmate de context volloopt, nog ruim voordat de limiet is bereikt. Dit fenomeen staat bekend als
	<strong>context rot</strong>.
</p>

<h2 class="mt-8 font-bold text-xl">Lost in the Middle</h2>
<p class="mt-2">
	Liu e.a. (2024) toonden aan dat LLMs een <strong>U-vormige prestatiecurve</strong> volgen:
	informatie aan het begin en einde van de context wordt goed verwerkt, maar informatie in het
	midden degradeert sterk met een <strong>daling van ~20 procentpunten</strong> in accuraatheid. Bij
	20&ndash;30 documenten in de context presteerden modellen met het antwoord in het midden
	<em>slechter</em> dan wanneer ze &nbsp;helemaal geen documenten kregen (closed-book). Het effect was
	consistent over alle geteste modellen en contextlengtes.
</p>
<p class="mt-2 text-xs text-claude-muted">
	Bron: Liu, N.F. e.a. "Lost in the Middle: How Language Models Use Long Contexts" (<cite
		>Transactions of the ACL</cite
	>, 2024 &bull;
	<a class="text-blue-400 underline" href="https://arxiv.org/abs/2307.03172">arXiv:2307.03172</a>)
</p>

<h2 class="mt-8 font-bold text-xl">Context Rot</h2>
<p class="mt-2">
	Chroma Research (2025) testte 18 frontier modellen, waaronder GPT-4.1, Claude 4, Gemini 2.5 en
	Qwen3 en vond dat <strong>elk model degradeert</strong> naarmate de context langer wordt. Zelfs op simpele
	taken zoals het herhalen van woorden of semantische retrievals nam de betrouwbaarheid af. De degradatie
	is continu, niet &eacute;&eacute;n abrupte drop bij de limiet.
</p>

<h3 class="mt-4 font-bold text-lg">Belangrijkste bevindingen</h3>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		Prestaties dalen <strong>niet-uniform</strong> met langere inputs niet lineair, maar met onverwachte
		pieken en dalen.
	</li>
	<li>
		Semantische taken (waarbij de AI verbanden moet leggen) degraderen <strong>veel sneller</strong>
		dan simpele lexicale retrievals.
	</li>
	<li>
		De <strong>signaal-ruisverhouding</strong> is bepalend, niet de ruwe contextgrootte: meer tokens betekenen
		meer ruis, wat de outputkwaliteit actief schaadt.
	</li>
</ul>
<p class="mt-2 text-xs text-claude-muted">
	Bron: Hong, K., Troynikov, A. & Huber, J. "Context Rot: How Increasing Input Tokens Impacts LLM
	Performance" (Chroma Technical Report, 2025 &bull;
	<a class="text-blue-400 underline" href="https://research.trychroma.com/context-rot"
		>research.trychroma.com/context-rot</a
	>)
</p>

<h2 class="mt-8 font-bold text-xl">De 70%-drempel</h2>
<p class="mt-2">
	Uit praktijkobservaties en diverse onderzoeken blijkt dat de kwaliteit van code-uitvoer meetbaar
	afneemt wanneer de context voor <strong>~70% of meer</strong> gevuld is. Paulsen e.a. (2026)
	introduceerden het concept <strong>Maximum Effective Context Window (MECW)</strong>: de praktische
	grens waarbinnen een model betrouwbaar presteert, ver voor de theoretische maximumlimiet. Zodra de
	context deze drempel overschrijdt, neemt de kans op onder andere:
</p>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li><strong>Hallucinaties</strong> het model verzint feiten of code die niet kloppen.</li>
	<li>
		<strong>Inconsistente uitvoer</strong> stijl of conventies worden losgelaten halverwege.
	</li>
	<li><strong>Herhalingen</strong> het model valt in loops of herhaalt eerdere suggesties.</li>
	<li><strong>Contextverlies</strong> eerdere instructies of afspraken worden genegeerd.</li>
</ul>
<p class="mt-2 text-xs text-claude-muted">
	Bron: Paulsen, N. e.a. "The Maximum Effective Context Window for Real-World Problems" (<cite
		>OAJ AIML</cite
	>, 2026 &bull;
	<a class="text-blue-400 underline" href="https://www.oajaiml.com/uploads/archivepdf/643561268.pdf"
		>oajaiml.com</a
	>)
</p>

<h2 class="mt-8 font-bold text-xl">Praktische tips</h2>
<ul class="mt-2 ml-6 list-disc space-y-1">
	<li>
		<strong>Houd context zo klein mogelijk.</strong> Gebruik RAG of subagents om alleen de meest relevante
		informatie mee te sturen.
	</li>
	<li>
		<strong>Compressie &gt; capaciteit.</strong> Laat de AI samenvatten of irrelevantie uit filteren in
		plaats van alles in &eacute;&eacute;n context te proppen.
	</li>
	<li>
		<strong>Zet belangrijke instructies aan het begin of einde.</strong> Door de U-vormige attentiecurve
		komen deze het beste over.
	</li>
	<li>
		<strong>Monitor je token gebruik.</strong> Blijf onder de 70% van de contextlimiet voor
		kritische taken. Gebruik <code class="font-mono">claude</code> met
		<code class="font-mono">--verbose</code> om tokens te zien.
	</li>
	<li>
		<strong>Start een verse sessie bij complexe problemen.</strong> Als de context te vol raakt, begin
		dan een nieuwe chat en vat het project opnieuw samen.
	</li>
</ul>
