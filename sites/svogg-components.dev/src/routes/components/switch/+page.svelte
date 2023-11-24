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
		keyboard: [[`<kbd>Enter</kbd> or <kbd>Space</kbd>`, ['Toggles checked state']]]
	};

	let checked = false;
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>
			Component for toggling a binary state. Uses an internal checkbox element which could be used
			in conjunction with forms.
		</p>
		<br />
		<p>
			Not that when overriding styles, CSS variables <code>--width</code> and <code>--border</code> needs
			to be set with fixed pixel values on the root element in order for the toggle animation to not
			break. Like so:
		</p>
		<br />
		<CodeBlock
			code={`
			.svogg-switch {
				/* Overrides variables */
				--width: 48px;
				--border: 2px;
			}
		`}
			language="css"
		/>
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
