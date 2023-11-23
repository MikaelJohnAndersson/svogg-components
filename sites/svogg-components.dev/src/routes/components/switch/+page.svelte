<script lang="ts">
	import { Switch } from 'svogg-components';
	import sveld from 'svogg-components/components/Switch/Switch.svelte?raw&sveld';
	import { CodeBlock, DocsShell, DocsType } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	const settings: DocsShellSettings = {
		type: DocsType.Component,
		title: 'Switch',
		components: [{ name: 'Switch', sveld }],
		imports: ['Switch'],
		classes: [
			['.svogg-switch', 'Applied to outer element'],
			['.thumb', 'Applied to inner element'],
			['.checked', 'Applied to outer element when checked']
		],
		keyboard: [[`<kbd>Enter or Space</kbd>`, ['Toggles checked state']]]
	};

	let checked = false;
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>Toggle switch.</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<Switch bind:checked />
		<span class="py-2">
			I am {checked ? '' : 'NOT'} checked!
		</span>
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock code={`let checked = false;`} language="typescript" />
		<CodeBlock
			code={`
        <Switch bind:checked />
        <span class="py-2">
          I am {checked ? '' : 'NOT'} checked!
        </span>
      `}
		/>
	</svelte:fragment>
</DocsShell>
