<script lang="ts">
	export let columns: string[];
	export let caption: string | undefined = undefined;
</script>

<div class="root">
	<table {...$$restProps}>
		{#if caption}
			<caption>{caption}</caption>
		{/if}
		<thead>
			<tr>
				{#each columns as column}
					<th>{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<slot />
		</tbody>
	</table>
</div>

<style lang="postcss">
	.root {
		@apply overflow-x-auto w-full;
	}

	table {
		@apply table-fixed w-full overflow-hidden mb-6;

		caption {
			@apply text-left my-2 font-bold;
		}
	}

	th {
		@apply text-left text-xs font-bold px-2 py-4;
	}

	:global(tr:nth-child(odd)):not(thead tr) {
		background-color: var(--svogg-surface-200);
	}

	:global(td) {
		@apply py-2 px-2;
	}

	:global(code) {
		@apply text-sm;
	}
</style>
