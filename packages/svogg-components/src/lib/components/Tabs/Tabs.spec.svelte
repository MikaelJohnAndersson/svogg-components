<script>
	import TabList from './TabList.svelte';
	import Tab from './Tab.svelte';
	import TabPanel from './TabPanel.svelte';

	export let tabs;
	export let selectedTab;
</script>

<TabList bind:selectedTab>
	<svelte:fragment slot="tabs">
		{#each tabs as { label, tabId, panelId }}
			<Tab id={tabId} selected={selectedTab == tabId} controls={panelId}>
				{label}
			</Tab>
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="panel">
		{#each tabs as { panelId, tabId, panelContent }}
			<TabPanel
				id={panelId}
				active={selectedTab == tabId}
				labelledby={tabId}
				class="p-4 flex items-center justify-center"
			>
				{panelContent}
			</TabPanel>
		{/each}
	</svelte:fragment>
</TabList>
