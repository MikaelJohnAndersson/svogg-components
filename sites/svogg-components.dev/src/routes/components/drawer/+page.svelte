<script lang="ts" context="module">
	type Icons = {
		Bats: string;
		Spiders: string;
		Scorpions: string;
	};
</script>

<script lang="ts">
	import { Drawer } from 'svogg-components';
	import drawerSrc from 'svogg-components/components/Drawer/Drawer.svelte?raw&sveld';
	import { CodeBlock, DocsShell, DocsType } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	const settings: DocsShellSettings = {
		type: DocsType.Component,
		title: 'Drawer',
		components: [{ name: 'Drawer', sveld: drawerSrc }],
		imports: ['Drawer'],
		classes: [
			['.svogg-drawer-overlay', 'Applied to overlay'],
			['.svogg-drawer', 'Applied to drawer container']
		],
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
			],
			[`<kbd>Esc</kbd>`, ['Closes the drawer.']]
		]
	};

	let open = false;

	const icons: Icons = {
		Bats: '&#129415',
		Spiders: '&#128375',
		Scorpions: '&#129410'
	};

	const creepyAnimals: (keyof Icons)[] = ['Bats', 'Spiders', 'Scorpions'];
	let creepiestAnimal = creepyAnimals[0];

	function handleClickCreepyAnimal(ev: MouseEvent) {
		const target = ev.target as HTMLElement;
		creepiestAnimal = target.getAttribute('data-animal') as keyof Icons;
		open = false;
	}
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>Drawer component that traps focus internally and prevents document scroll.</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<Drawer id="drawer" on:click_outside={() => (open = false)} bind:open>
			<div class="p-4 flex flex-col items-end gap-4">
				<div class="flex items-center">
					<button
						on:click={() => (open = false)}
						aria-label="Close drawer"
						class="drawer-close-btn"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<ul class="flex flex-col w-full min-w-[200px] gap-2">
					{#each creepyAnimals as animal}
						{@const active = animal == creepiestAnimal}
						<li class="drawer-item" class:active>
							<button data-animal={animal} on:click={handleClickCreepyAnimal}>
								<span class="flex items-center gap-2 pointer-events-none">
									{animal}
									{@html icons[animal]}
								</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</Drawer>
		<button
			on:click={() => (open = true)}
			class="svogg-btn"
			aria-expanded={open}
			aria-controls="drawer"
		>
			Open drawer
		</button>
		<span class="py-2">The creepiest animal is {@html icons[creepiestAnimal]}</span>
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock
			code={`
				let open = false;
		
				const icons = {
					Bats: '&#129415',
					Spiders: '&#128375',
					Scorpions: '&#129410'
				};

				const creepyAnimals = ['Bats', 'Spiders', 'Scorpions'];
				let creepiestAnimal = creepyAnimals[0];

				function handleClickCreepyAnimal(ev: MouseEvent) {
					const target = ev.target as HTMLElement;
					creepiestAnimal = target.getAttribute('data-animal') as string;
					open = false;
				}
    `}
			language="typescript"
		/>
		<CodeBlock
			code={`
				<Drawer id="drawer" on:click_outside={() => (open = false)} bind:open>
					<div class="p-4 flex flex-col items-end gap-4">
						<div class="flex items-center">
							<button
								on:click={() => (open = false)}
								aria-label="Close drawer"
								class="svogg-btn"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<ul class="flex flex-col w-full min-w-[200px] gap-2">
							{#each creepyAnimals as animal}
								{@const active = animal == creepiestAnimal}
								<li class="drawer-item" class:active>
									<button
										data-animal={animal}
										on:click={handleClickCreepyAnimal}
									>
										<span class="flex items-center gap-2 pointer-events-none">
											{animal}
											{@html icons[animal]}
										</span>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</Drawer>
				<button
					on:click={() => (open = true)}
					class="drawer-toggle-btn"
					aria-expanded={open}
					aria-controls="drawer"
				>
					Open drawer
				</button>
				<span class="py-2">
					The creepiest animal is {@html icons[creepiestAnimal]}
				</span>
			`}
		/>
	</svelte:fragment>
</DocsShell>

<style lang="postcss">
	.drawer-item {
		@apply w-full flex items-center justify-end text-lg p-2 rounded;

		&:hover {
			background-color: var(--svogg-surface-300);
		}

		&.active {
			background-color: var(--svogg-surface-400);
		}
	}

	.drawer-close-btn {
		@apply rounded p-2;

		&:hover {
			background-color: var(--svogg-surface-300);
		}
	}
</style>
