<script lang="ts">
	import { CodeBlock } from '$lib/components';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const SVOGG_HUE = '--svogg-primary-hue';
	const SVOGG_SATURATION = '--svogg-primary-saturation';
	const SVOGG_LIGHTNESS = '--svogg-primary-lightness';

	const HUE_MAX = '360';
	const SATURATION_MAX = '100';
	const LIGHTNESS_MAX = '100';

	let hue: number;
	$: onChangeHSLValue(hue, SVOGG_HUE);

	let saturation: number;
	$: onChangeHSLValue(saturation, SVOGG_SATURATION);

	let lightness: number;
	$: onChangeHSLValue(lightness, SVOGG_LIGHTNESS);

	function onChangeHSLValue(val: number | string, type: string) {
		if (!browser || !val) return;
		const root = document.querySelector(':root') as HTMLElement;
		if (!root) return;

		root.style.setProperty(type, type === SVOGG_HUE ? `${val}` : `${val}%`);
	}

	onMount(() => {
		const root = document.querySelector(':root');
		if (!root) return;

		const styles = getComputedStyle(root);

		const primaryHue = styles.getPropertyValue(SVOGG_HUE);
		hue = +primaryHue;

		const primarySaturation = styles.getPropertyValue(SVOGG_SATURATION);
		saturation = +primarySaturation.replace('%', '');

		const primaryLightness = styles.getPropertyValue(SVOGG_LIGHTNESS);
		lightness = +primaryLightness.replace('%', '');
	});
</script>

<article>
	<h1>CSS</h1>
	<p>
		<code>svogg-components</code> emphazises encapsulation of logic management of commonly used components
		and is purposefully not meant to be used as a full on CSS framework. However, some lightweight token-based
		css variables and classes suitable for quick prototyping are provided.
	</p>
	<br />
	<p>
		Styles are completely opt-in and can be used by importing the provided stylesheet (preferably in
		your top level <code>+layout.page</code>):
	</p>
	<CodeBlock
		class="my-4"
		code="import 'svogg-components/styles/index.css';"
		language="typescript"
	/>
	<p>
		Component classes can be overriden or extended by adding rules in your own stylesheet. See which
		classes are being used in each component under "CSS" in respective component docs page.
	</p>
	<CodeBlock
		class="my-4"
		code={`
      .svogg-drawer {
        /* Overrides Drawer component background-color */
        background-color: red;
      }
    `}
		language="css"
	/>
	<p>
		In order for the styles to be overriden properly, it is important to add the import of the
		provided stylesheet <strong>before</strong> the overriding styles.
	</p>
	<p>
		<code>svogg-components</code> bases colors around one primary color represented by HSL values.
		These values provide a basis for the design tokens, being variations of the HSL values. The
		provided stylesheets contains rules for light/dark mode respectively - meaning all you have to
		do is define a primary color and let <code>svogg-components</code> manage dark/light mode internally.
		Of course, you could still always override these rules for full control.
	</p>
	<br />
	<p>
		Like all classes, the HSL values can be overriden in your own stylesheet. Changes in these
		values will reflect on all provided components and classes.
	</p>
	<CodeBlock
		class="my-4"
		code={`
      :root {
        /* Overrides svogg-components HSL values */
        --svogg-primary-hue: 200;
        --svogg-primary-saturation: 100%;
        --svogg-primary-lightness: 20%;
      }
    `}
		language="css"
	/>
	<p>
		Try it out for yourself by adjusting the values below and see how it reflects on the colors of
		this page (check out <a href="https://hslpicker.com/" target="_blank">HSL Color Picker</a> for an
		even better color picker):
	</p>
	<div class="flex gap-2 my-6 justify-center">
		<div class="color p-4" />
		<div class="flex flex-col gap-2 items-start">
			<label>
				<abbr title="Hue">H</abbr>
				<input class="hue" type="range" min="0" max={HUE_MAX} bind:value={hue} />
				<input
					class="svogg-input rounded-r-full w-20"
					type="number"
					max={HUE_MAX}
					bind:value={hue}
				/>
			</label>
			<label>
				<abbr title="Saturation">S</abbr>
				<input
					class="saturation"
					type="range"
					min="0"
					max={SATURATION_MAX}
					bind:value={saturation}
				/>
				<input
					class="svogg-input rounded-r-full w-20"
					type="number"
					max={SATURATION_MAX}
					bind:value={saturation}
				/>
			</label>
			<label>
				<abbr title="Lightness">L</abbr>
				<input class="lightness" type="range" min="0" max={LIGHTNESS_MAX} bind:value={lightness} />
				<input
					class="svogg-input rounded-r-full w-20"
					type="number"
					max={LIGHTNESS_MAX}
					bind:value={lightness}
				/>
			</label>
		</div>
	</div>
	<br />
	<p>
		Additionally, <code>svogg-components</code> provides some extra classes which could be used in conjunction
		with the components for a coherent look:
	</p>
	<!-- TODO: Link to css instead? -->
	<br />
	TODO
	<!-- <CodeBlock
		class="my-4"
		code={`
      .svogg-input {
        padding: 0.5rem;
        min-width: 0px;
        background-color: var(--svogg-surface-300);
        color: var(--svogg-text);
        border-radius: 0.25rem;
      }

      .svogg-btn {
        border-radius: 0.25rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: var(--svogg-surface-300);
      }

      .svogg-btn:hover {
        background-color: var(--svogg-surface-400);
      }
    `}
		language="css"
	/> -->
</article>

<style lang="postcss">
	.color {
		background-color: hsl(
			var(--svogg-primary-hue),
			var(--svogg-primary-saturation),
			var(--svogg-primary-lightness)
		);
	}

	abbr {
		@apply px-2 flex items-center;
		text-decoration: none;
	}

	label {
		@apply flex;
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
		width: 15rem;
		background: transparent;
		flex: 1;
	}

	input[type='range']::-webkit-slider-thumb {
		@apply shadow rounded-full shadow-black;
		-webkit-appearance: none;
		height: 100%;
		width: 1.25rem;
		background: white;
		cursor: pointer;
	}

	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type='range']::-webkit-slider-runnable-track {
		@apply rounded-l-full;
		height: 100%;
	}

	input.hue::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			hsla(0, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(10, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(20, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(30, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(40, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(50, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(60, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(70, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(80, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(90, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(100, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(110, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(120, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(130, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(140, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(150, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(160, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(170, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(180, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(190, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(200, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(210, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(220, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(230, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(240, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(250, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(260, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(270, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(280, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(290, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(300, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(310, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(320, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(330, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(340, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(350, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1),
			hsla(360, var(--svogg-primary-saturation), var(--svogg-primary-lightness), 1)
		);
	}

	input.saturation::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			hsla(var(--svogg-primary-hue), 0%, var(--svogg-primary-lightness), 1),
			hsla(var(--svogg-primary-hue), 20%, var(--svogg-primary-lightness), 1),
			hsla(var(--svogg-primary-hue), 40%, var(--svogg-primary-lightness), 1),
			hsla(var(--svogg-primary-hue), 60%, var(--svogg-primary-lightness), 1),
			hsla(var(--svogg-primary-hue), 80%, var(--svogg-primary-lightness), 1),
			hsla(var(--svogg-primary-hue), 100%, var(--svogg-primary-lightness), 1)
		);
	}

	input.lightness::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 0%, 1),
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 20%, 1),
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 40%, 1),
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 60%, 1),
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 80%, 1),
			hsla(var(--svogg-primary-hue), var(--svogg-primary-saturation), 100%, 1)
		);
	}

	/******** Firefox ********/
	input[type='range']::-moz-range-track {
		background: #053a5f;
		height: 0.5rem;
	}
</style>
