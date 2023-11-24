<script lang="ts">
	import 'svogg-components/styles/index.css';
	import '../styles/app.postcss';
	import '../styles/hljs.css'; // highlight.js styles
	import { navigating } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Navigation, IconLinks, LightSwitch } from '$lib/components';
	import { Drawer } from 'svogg-components';

	// @ts-expect-error reading from vite.config.js
	// eslint-disable-next-line no-undef
	const pkg = __PACKAGE__;

	let drawerOpen = false;
	$: if ($navigating) drawerOpen = false;

	const openMobileNav = () => (drawerOpen = true);
	const closeMobileNav = () => (drawerOpen = false);
</script>

<svelte:head>
	<title>svogg-components</title>
</svelte:head>

<header class="flex items-center justify-between p-4">
	<div class="flex items-center justify-center gap-4">
		<button
			aria-expanded={drawerOpen}
			aria-controls="navigation"
			on:click={openMobileNav}
			class="md:hidden"
		>
			<Icon icon="tabler:menu" />
		</button>
		<div class="flex gap-2 items-end">
			<span class="font-mono text-xl leading-none">svogg-components</span>
			<span class="font-mono text-xs">{pkg.version}</span>
		</div>
	</div>
	<div class="hidden sm:flex items-center justify-center gap-4">
		<LightSwitch />
		<IconLinks />
	</div>
</header>
<Drawer bind:open={drawerOpen} position="left" id="navigation" as="aside">
	<button
		class="absolute left-full m-2 p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
		on:click={closeMobileNav}
	>
		<Icon icon="tabler:x" class="w-6 h-6" />
	</button>
	<div class="flex flex-col justify-between h-full">
		<Navigation />
		<div class="flex justify-between py-4 mx-4 sm:hidden">
			<IconLinks />
			<LightSwitch />
		</div>
	</div>
</Drawer>
<div class="flex flex-1 overflow-hidden">
	<aside class="max-md:hidden">
		<Navigation />
	</aside>
	<main class="scrollable p-4 flex-1 flex gap-4 w-full">
		<slot />
	</main>
</div>

<style lang="postcss">
	.scrollable {
		@apply h-auto overflow-y-auto;
	}

	:global(article) {
		@apply max-w-4xl w-full;
	}
</style>
