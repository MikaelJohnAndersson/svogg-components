<script lang="ts">
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import css from 'svelte-highlight/languages/css';
	import bash from 'svelte-highlight/languages/bash';

	export let code: string;
	export let language: 'typescript' | 'css' | 'bash' | 'svelte' = 'svelte';
	$: formattedCode = removeLeadingTabs(code);

	function removeLeadingTabs(str: string) {
		// Remove leading/trailing newlines and split by newline
		const rows = str.replace(/^\n+/, '').split('\n');
		// Find number of leading tabs by counting occurences of \t or space on the first line
		const leadingTabs = rows[0].split(/[^(\t|" ")]/)[0].length;

		return rows.map((row) => row.slice(leadingTabs)).join('\n');
	}
</script>

<div class={`root p-4 flex flex-col gap-4 rounded-lg ${$$props.class || ''}`}>
	<header class="flex items-center justify-between">
		<span class="uppercase text-xs">{language}</span>
	</header>
	{#if language == 'typescript'}
		<Highlight language={typescript} code={formattedCode} />
	{:else if language == 'css'}
		<Highlight language={css} code={formattedCode} />
	{:else if language == 'bash'}
		<Highlight language={bash} code={formattedCode} />
	{:else if language == 'svelte'}
		<HighlightSvelte code={formattedCode} />
	{/if}
</div>

<style lang="postcss">
	/* svelte-highlight injects pre-tag  */
	:global(pre) {
		@apply whitespace-pre-wrap break-all;
	}

	/* Override default hljs background and padding */
	:global(.hljs) {
		background: transparent !important;
		padding: 0 !important;
	}

	.root {
		background-color: var(--svogg-surface-200);
	}
</style>
