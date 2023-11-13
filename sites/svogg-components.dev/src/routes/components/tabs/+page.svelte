<script lang="ts">
	import { TabList, Tab, TabPanel } from 'svogg-components';
	import tabListSrc from 'svogg-components/components/TabList/TabList.svelte?raw&sveld';
	import tabSrc from 'svogg-components/components/TabList/Tab.svelte?raw&sveld';
	import tabPanelSrc from 'svogg-components/components/TabList/TabPanel.svelte?raw&sveld';
	import { CodeBlock, DocsShell, DocsType } from '$lib/components';
	import type { DocsShellSettings } from '$lib/components';

	const settings: DocsShellSettings = {
		type: DocsType.Component,
		title: 'Tabs',
		components: [
			{ name: 'TabList', sveld: tabListSrc },
			{ name: 'Tab', sveld: tabSrc },
			{ name: 'TabPanel', sveld: tabPanelSrc }
		],
		imports: ['Tablist', 'Tab', 'TabPanel'],
		classes: [
			['.svogg-tablist', 'Applied to tablist'],
			['.svogg-tab', 'Applied to tabs'],
			['.selected', 'Applied to selected tab']
		],
		keyboard: [
			[
				`<kbd>Tab</kbd>`,
				[
					'When focus moves into the component, places focus on the active tab.',
					'If a tab has focus, moves focus to the next element in the document tab sequence. If panels are used, this would be the active tab panel.',
					'If a tab panel has focus, moves focus to the first focusable element within the panel, or moves focus to the next element in the document tab sequence.'
				]
			],
			[
				`<kbd>Shift + Tab</kbd>`,
				[
					'When focus moves into the component, places focus on the active tab panel if panels are used, else moves focus to the active tab.',
					'If the active tab panel has focus, moves focus to the active tab.',
					'If a tab has focus, moves focus to the previous element in the document tab sequence.'
				]
			],
			[
				`<kbd>&larr;</kbd> or <kbd>&rarr;</kbd>`,
				['If a tab has focus, selects and moves focus to the next/previous tab.']
			]
		]
	};

	let tabs = [
		{ label: 'Spiders', tabId: 'tab-spiders', panelId: 'panel-spiders', icon: '&#128375' },
		{ label: 'Scorpions', tabId: 'tab-scorpions', panelId: 'panel-scorpions', icon: '&#129410' },
		{ label: 'Bats', tabId: 'tab-bats', panelId: 'panel-bats', icon: '&#129415' }
	];

	let selectedTab = 'tab-spiders';
</script>

<DocsShell {settings}>
	<svelte:fragment slot="description">
		<p>Collection of tab components meant to be used in conjunction with each other.</p>
		<br />
		<p>
			Handles tab selection internally and encourages accessible implementations by requiring the
			use of HTML <code>id</code>
			attributes on tabs, which simultaneously works well with attribute such as
			<code>aria-controls</code>
			and <code>aria-labelledby</code>.
		</p>
	</svelte:fragment>
	<svelte:fragment slot="demo">
		<TabList bind:selectedTab>
			<svelte:fragment slot="tabs">
				{#each tabs as { label, tabId, panelId }}
					<Tab id={tabId} selected={selectedTab == tabId} controls={panelId}>
						{label}
					</Tab>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="panel">
				{#each tabs as { panelId, tabId, icon }}
					<TabPanel
						id={panelId}
						active={selectedTab == tabId}
						labelledby={tabId}
						class="p-4 flex items-center justify-center"
					>
						{@html icon}
					</TabPanel>
				{/each}
			</svelte:fragment>
		</TabList>
	</svelte:fragment>
	<svelte:fragment slot="code">
		<CodeBlock
			code={`
				let tabs = [
					{
						label: 'Spiders',
						tabId: 'tab-spiders',
						panelId: 'panel-spiders',
						icon: '&#128375'
					},
					{
						label: 'Scorpions',
						tabId: 'tab-scorpions',
						panelId: 'panel-scorpions',
						icon: '&#129410'
					},
					{
						label: 'Bats',
						tabId: 'tab-bats',
						panelId: 'panel-bats',
						icon: '&#129415'
					}
				];

				let selectedTab = 'tab-spiders';
			`}
			language="typescript"
		/>
		<CodeBlock
			code={`
				<TabList bind:selectedTab>
					<svelte:fragment slot="tabs">
						{#each tabs as { label, tabId, panelId }}
							<Tab
								id={tabId}
								selected={selectedTab == tabId}
								controls={panelId}
							>
								{label}
							</Tab>
						{/each}
					</svelte:fragment>
					<svelte:fragment slot="panel">
						{#each tabs as { panelId, tabId, icon }}
							<TabPanel
								id={panelId}
								active={selectedTab == tabId}
								labelledby={tabId}
								class="p-4 flex items-center justify-center"
							>
								{@html icon}
							</TabPanel>
						{/each}
					</svelte:fragment>
				</TabList>
			`}
		/>
	</svelte:fragment>
</DocsShell>
