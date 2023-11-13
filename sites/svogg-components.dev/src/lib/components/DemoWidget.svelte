<script lang="ts">
	import { TabList, Tab, TabPanel } from 'svogg-components';

	export let id: string;
	let selectedTab = 'tab-demo';
</script>

<section class={$$props.class} {id}>
	<TabList bind:selectedTab>
		<svelte:fragment slot="tabs">
			<Tab id="tab-demo" controls="panel-demo" selected={selectedTab == 'tab-demo'}>Demo</Tab>
			<Tab id="tab-code" controls="panel-code" selected={selectedTab == 'tab-code'}>Code</Tab>
		</svelte:fragment>
		<svelte:fragment slot="panel">
			<div class="panel">
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
</section>

<style lang="postcss">
	.panel {
		@apply flex flex-col items-center justify-center p-8 rounded-b-lg border;
		border-color: var(--svogg-surface-300);
		/* background-color: var(--svogg-surface-200); */
	}
</style>
