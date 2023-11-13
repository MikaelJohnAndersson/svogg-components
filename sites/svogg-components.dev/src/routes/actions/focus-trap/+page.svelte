<script lang="ts">
	import { focusTrap } from 'svogg-components';
	import { DocsShell, DocsType, CodeBlock } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	const settings: DocsShellSettings = {
		type: DocsType.Action,
		title: 'focusTrap',
		imports: ['focusTrap'],
		keyboard: [
			[
				`<kbd>Tab</kbd>`,
				[
					'Moves focus to next focusable child element.',
					'If the last focusable element has focus, moves focus to the first focusable child element.'
				]
			],
			[
				`<kbd>Shift + Tab</kbd>`,
				[
					'Moves focus to previous focusable child element.',
					'If the first focusable element has focus, moves focus to the last focusable child element.'
				]
			]
		]
	};
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>
			Utility for trapping focus within an element. Good for e.g. drawers and modals. On mount,
			focuses the first focusable element by default.
		</p>
		<br />
		<p>
			Try moving focus by tabbing inside of the card in the demo and see how focus never breaks out
			of the element.
		</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<div class="flex flex-col gap-4 surface-200 p-6 rounded" use:focusTrap>
			<label class="flex flex-col gap-2">
				<span class="leading-none">Name</span>
				<input class="svogg-input" type="text" placeholder="svogg" />
			</label>
			<label class="flex flex-col gap-2">
				<span class="leading-none">Email</span>
				<input class="svogg-input" type="text" placeholder="admin@svogg.dev" />
			</label>
			<button class="svogg-btn self-end">Click me</button>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock
			code={`
				<div class="flex flex-col gap-4 surface-200 p-6 rounded" use:focusTrap>
					<label class="flex flex-col gap-2">
						<span class="leading-none">Name</span>
						<input class="svogg-input" type="text" placeholder="svogg" />
					</label>
					<label class="flex flex-col gap-2">
						<span class="leading-none">Email</span>
						<input class="svogg-input" type="text" placeholder="admin@svogg.dev" />
					</label>
					<button class="svogg-btn self-end">Click me</button>
        </div>
      `}
		/>
	</svelte:fragment>
</DocsShell>
