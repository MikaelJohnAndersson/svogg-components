<script lang="ts">
	import { page } from '$app/stores';
	const PAGE_SECTIONS = [
		{
			heading: 'docs',
			pages: [
				{
					title: 'Home',
					href: '/'
				},
				{
					title: 'CSS',
					href: '/css'
				}
			]
		},
		{
			heading: 'components',
			pages: [
				{
					title: 'ChipInput',
					href: '/components/chip-input'
				},
				{
					title: 'Drawer',
					href: '/components/drawer'
				},
				{
					title: 'Tabs',
					href: '/components/tabs'
				}
			]
		},
		{
			heading: 'actions',
			pages: [
				{
					title: 'focusTrap',
					href: '/actions/focus-trap'
				},
				{
					title: 'clickOutside',
					href: '/actions/click-outside'
				}
			]
		}
	];
</script>

<div class="flex flex-col p-4 gap-4 min-w-[200px]">
	{#each PAGE_SECTIONS as { heading, pages }}
		{@const id = heading}
		<section>
			<h2 class="uppercase text-xs mb-2 text-light" {id}>{heading}</h2>
			<nav aria-labelledby={id}>
				<ul class="flex flex-col gap-1">
					{#each pages as { title, href }}
						{@const isActiveRoute = $page.url.pathname == href}
						<li class="hover:underline flex" class:font-bold={isActiveRoute}>
							<a {href} class="w-full">{title}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</section>
	{/each}
</div>
