<script>
	/**
	 * HTML `aria-labelledby` attribute
	 * @type {string}
	 */
	export let labelledby;
	/**
	 * Panel active state
	 * @type {boolean}
	 */
	export let active = false;
	/**
	 * HTML `id` attribute
	 * @type {(string | undefined)}
	 */
	export let id = undefined;

	$: style = !active ? 'display: none;' : '';
</script>

<div {id} role="tabpanel" aria-labelledby={labelledby} class={$$props.class} tabindex="0" {style}>
	<slot />
</div>
