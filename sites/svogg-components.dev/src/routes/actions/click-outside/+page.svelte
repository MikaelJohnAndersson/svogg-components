<script lang="ts">
	import { clickOutside } from 'svogg-components';
	import { DocsShell, DocsType, CodeBlock } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	const settings: DocsShellSettings = {
		type: DocsType.Action,
		title: 'clickOutside',
		imports: ['clickOutside'],
		params: [
			{
				name: 'handler',
				type: 'Function',
				required: true,
				description: 'Callback that runs when clicking outside the element.'
			}
		]
	};

	function onClickOutside(ev: MouseEvent) {
		console.log('Clicked outside!', ev);
	}
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>Utility for handling clicking outside an element. Useful for e.g. modals and drawers.</p>
		<br />
		<p>Try it out by opening up the console and clicking outside the card in the demo.</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<div class="flex flex-col gap-4 surface-200 p-6 rounded" use:clickOutside={onClickOutside}>
			Click outside me!
		</div>
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock
			code={`
				function onClickOutside(ev: MouseEvent) {
					console.log('Clicked outside!', ev);
				}
      `}
			language="typescript"
		/>
		<CodeBlock
			code={`
				<div
					class="flex flex-col gap-4 surface-200 p-6 rounded"
					use:clickOutside={onClickOutside}
				>
					Click outside me!
				</div>
      `}
		/>
	</svelte:fragment>
</DocsShell>
