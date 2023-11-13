<script lang="ts">
	import { ChipInput } from 'svogg-components';
	import chipInputSrc from 'svogg-components/components/ChipInput/ChipInput.svelte?raw&sveld';
	import { CodeBlock, DocsShell, DocsType } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	let chips = ['Bats', 'Scorpions'];

	const settings: DocsShellSettings = {
		type: DocsType.Component,
		title: 'ChipInput',
		components: [{ name: 'ChipInput', sveld: chipInputSrc }],
		imports: ['ChipInput'],
		classes: [
			['.svogg-input', 'Applied to the text input'],
			['.svogg-chip', 'Applied to input chips']
		],
		keyboard: [
			[
				`<kbd>Tab</kbd>`,
				[
					'When focus moves into the component, places focus on the text input.',
					'If text input has focus, moves focus to the first column of the first chip.',
					'When a chip contains focus, moves focus to the next element in the document tab sequence.'
				]
			],
			[
				`<kbd>Shift + Tab</kbd>`,
				[
					'When focus moves into the component, places focus on the first column of the first chip.',
					'If a chip contains focus, places focus on the text input.',
					'If the text chip has focus, moves focus to the previous element in the document tab sequence.'
				]
			],
			[
				`<kbd>&larr;</kbd> or <kbd>&rarr;</kbd>`,
				[
					'If a chip contains focus, moves focus horizontally to the next or previous column respectively.'
				]
			],
			[
				`<kbd>&uarr;</kbd> or <kbd>&darr;</kbd>`,
				[
					'If a chip contains focus, moves focus horizontally to the next or previous column with the same column index.'
				]
			]
		]
	};
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>
			Component for manipulating a list of strings represented by chips/badges. Uses the WAI-ARIA <a
				href="https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/"
				target="_blank">grid</a
			>
			pattern for structuring the list of chips. Value can either be bound directly via
			<code>bind:chips</code>, or retrieved natively from form data by passing a <code>name</code>
			attribute to the component.
		</p>
		<br />
		<p>
			Note that if used in conjunction with Svelte
			<a href="https://kit.svelte.dev/docs/form-actions" target="_blank">form actions</a>, the value
			must be manually converted to a value compatible with
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData" target="_blank">
				FormData
			</a>
			before posting (for example by modifying the value in a submit function when using progressive
			enhancement).
		</p>
		<br />
		<p>
			In addition to the declared props, the component accepts any props valid as attributes for a
			native <code>input</code> HTML element.
		</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<ChipInput placeholder="Add a creepy animal..." bind:chips />
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock code={`let chips: string[] = ['Bats', 'Scorpions'];`} language="typescript" />
		<CodeBlock code={`<ChipInput placeholder="Add a creepy animal..." bind:chips />`} />
	</svelte:fragment>
</DocsShell>
