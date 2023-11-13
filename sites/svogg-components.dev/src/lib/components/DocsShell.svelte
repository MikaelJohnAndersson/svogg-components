<script lang="ts" context="module">
	import type { SveldJson } from 'sveld-types';

	export enum DocsType {
		Component = 'component',
		Action = 'action'
	}

	type Component = {
		name: string;
		sveld: SveldJson;
	};

	type ActionParam = {
		name: string;
		type: string;
		description: string;
		required: boolean;
		source?: string;
	};

	type BaseSettings = {
		type: DocsType;
		title: string;
		imports: string[];
		keyboard?: [string, string[]][];
	};

	type ComponentSettings = BaseSettings & {
		type: DocsType.Component;
		components: Component[];
		classes?: [string, string][];
	};

	type ActionSettings = BaseSettings & {
		type: DocsType.Action;
		params?: ActionParam[];
	};

	export type DocsShellSettings = ComponentSettings | ActionSettings;
</script>

<script lang="ts">
	import { DemoWidget, Table, CodeBlock } from '$lib/components';
	export let settings: DocsShellSettings;

	$: imports = `import { ${settings.imports.join(', ')} } from 'svogg-components';`;
</script>

<article class="flex-1">
	<h1>{settings.title}</h1>
	<CodeBlock code={imports} language="typescript" class="surface-200 mb-4" />
	<slot name="description" />
	<DemoWidget class="py-4" id="demo">
		<svelte:fragment slot="demo">
			<slot name="demo" />
		</svelte:fragment>
		<div class="flex flex-col gap-4" slot="code">
			<slot name="code" />
		</div>
	</DemoWidget>

	{#if settings.type === DocsType.Component}
		{#each settings.components as { name, sveld }}
			<h2 id={name}>{name}</h2>
			{#if sveld.props.length}
				<Table
					columns={['Name', 'Type', 'Required', 'Default', 'Description']}
					caption="Props"
					id={`${name}-props`}
				>
					{#each sveld.props as { name, type, isRequired, description, value }, i}
						<tr aria-rowindex={i}>
							<td><code class="font-bold">{name}</code></td>
							<td><code>{type}</code></td>
							<td><code>{isRequired}</code></td>
							<td><code>{isRequired ? '' : value || '-'}</code></td>
							<td class="text-sm">{description || ''}</td>
						</tr>
					{/each}
				</Table>
			{/if}
			{#if sveld.events.length}
				<Table
					columns={['Name', 'Detail', 'Type', 'Description']}
					caption="Events"
					id={`${name}-events`}
				>
					{#each sveld.events as { name, detail, type, description }, i}
						<tr aria-rowindex={i}>
							<td><code class="font-bold">{name}</code></td>
							<td><code>{detail}</code></td>
							<td>{type}</td>
							<td class="text-sm">{description || ''}</td>
						</tr>
					{/each}
				</Table>
			{/if}
		{/each}

		{#if settings.classes}
			<h2 id="css">CSS</h2>
			<Table columns={['Class', 'Description']} aria-labelledby="css">
				{#each settings.classes as [classname, description], i}
					<tr aria-rowindex={i}>
						<td><code class="font-bold">{classname}</code></td>
						<td class="text-sm">{description}</td>
					</tr>
				{/each}
			</Table>
		{/if}
	{/if}

	{#if settings.type === DocsType.Action}
		{#if settings.params}
			<h2 id="params">Params</h2>
			<Table columns={['Name', 'Type', 'Required', 'Description']} aria-labelledby="params">
				{#each settings.params as { name, type, required, description }, i}
					<tr aria-rowindex={i}>
						<td><code class="font-bold">{name}</code></td>
						<td><code>{type}</code></td>
						<td><code>{required}</code></td>
						<td class="text-sm">{description}</td>
					</tr>
				{/each}
			</Table>
		{/if}
	{/if}

	{#if settings.keyboard}
		<h2 id="keyboard-navigation">Keyboard navigation</h2>
		<ol class="list-decimal list-inside" aria-labelledby="keyboard-navigation">
			{#each settings.keyboard as [keys, results]}
				<li>
					{@html keys}
					<ol class="list-disc list-inside pl-4 py-2">
						{#each results as result}
							<li>{@html result}</li>
						{/each}
					</ol>
				</li>
			{/each}
		</ol>
	{/if}
</article>

<aside class="hidden xl:flex xl:flex-col w-[200px] sticky top-0" title="Table of contents">
	<h3 id="table-of-contents" class="text-light">On this page</h3>
	<nav aria-labelledby="table-of-contents">
		<ul>
			<li>
				<a href="#demo" class="w-full hover:underline">Demo</a>
			</li>
			{#if settings.type === DocsType.Component}
				{#each settings.components as { name, sveld }}
					<li>
						<a href={`#${name}`} class="w-full hover:underline">{name}</a>
					</li>
					{#if sveld.props.length}
						<li>
							<a href={`#${name}-props`} class="w-full hover:underline ml-4">Props</a>
						</li>
					{/if}
					{#if sveld.events.length}
						<li>
							<a href={`#${name}-events`} class="w-full hover:underline ml-4">Events</a>
						</li>
					{/if}
				{/each}
				{#if settings.classes}
					<li><a href="#css" class="w-full hover:underline">CSS</a></li>
				{/if}
			{/if}
			{#if settings.type === DocsType.Action}
				{#if settings.params}
					<li>
						<a href="#params" class="w-full hover:underline">Params</a>
					</li>
				{/if}
			{/if}
			{#if settings.keyboard}
				<li>
					<a href="#keyboard-navigation" class="w-full hover:underline">Keyboard navigation</a>
				</li>
			{/if}
		</ul>
	</nav>
</aside>

<style lang="postcss">
	:global(kbd) {
		@apply font-bold text-sm leading-none py-1 px-2 border-2 border-b-4 border-r-4 border-black rounded-md;
		background-color: var(--svogg-surface-300);
	}

	aside {
		& h3 {
			@apply uppercase text-xs mb-2;
		}

		& nav {
			@apply flex-1;

			& ul {
				@apply flex flex-col gap-1;

				& li {
					@apply flex;

					& a {
						@apply w-full hover:underline;
					}
				}
			}
		}
	}
</style>
