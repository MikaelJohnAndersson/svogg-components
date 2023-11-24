<script lang="ts">
	import { Switch } from 'svogg-components';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let checked = false;
	$: onChange(checked);

	function onChange(_checked: boolean) {
		if (!browser) return;
		const theme = checked ? 'light' : 'dark';
		const root = document.querySelector('html') as HTMLElement;
		root.setAttribute('data-theme', theme);
	}

	onMount(() => {
		const systemSettingsLight = window.matchMedia('(prefers-color-scheme: light)');
		checked = systemSettingsLight.matches;
	});
</script>

<div class="contents container">
	<Switch bind:checked />
</div>

<style lang="postcss">
	.container {
		:global(.svogg-switch::after) {
			@apply icon-[tabler--moon-filled];
			position: absolute;
			content: '';
			top: 0;
			left: auto;
			right: 2px;
			bottom: 0;
			margin: auto;
			transform: scale(0.8);
		}

		:global(.svogg-switch::before) {
			@apply icon-[tabler--sun-filled];
			position: absolute;
			content: '';
			top: 0;
			left: 2px;
			right: auto;
			bottom: 0;
			margin: auto;
			transform: scale(0.8);
		}

		:global(.svogg-switch .thumb) {
			@apply z-10 relative;
		}

		:global(.svogg-switch.checked) {
			border-color: var(--svogg-surface-400);
		}

		:global(.svogg-switch.checked .thumb) {
			background-color: var(--svogg-surface-400);
		}
	}
</style>
