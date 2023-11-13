<script>
	import { Tab, TabList, TabPanel } from '$lib';

	let selectedTab = 'tab-demo';
</script>

<TabList bind:selectedTab>
	<svelte:fragment slot="tabs">
		<Tab id="tab-demo" controls="panel-demo" selected={selectedTab == 'tab-demo'}>Demo</Tab>
		<Tab id="tab-code" controls="panel-code" selected={selectedTab == 'tab-code'}>Code</Tab>
	</svelte:fragment>
	<svelte:fragment slot="panel">
		<div class="flex items-center justify-center p-8 shadow-inner shadow-black/20">
			<TabPanel
				active={selectedTab == 'tab-demo'}
				id="panel-demo"
				labelledby="tab-demo"
				class="contents"
			>
				<slot name="demo" />
			</TabPanel>
			<TabPanel
				active={selectedTab == 'tab-code'}
				id="panel-code"
				labelledby="tab-code"
				class="contents"
			>
				<slot name="code" />
			</TabPanel>
		</div>
	</svelte:fragment>
</TabList>
