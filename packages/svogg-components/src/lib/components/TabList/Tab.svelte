<script>
	/**
	 * Tab selected state
	 * @type {boolean}
	 */
	export let selected = false;
	/**
	 * HTML `aria-controls` attribute
	 * @type {(string | undefined)}
	 */
	export let controls = undefined;
	/**
	 * HTML `id` attribute
	 * @type {string}
	 */
	export let id;

	/**
	 * @param {MouseEvent} ev
	 * @emits EventTarget#tab_click
	 */
	function handleClick(ev) {
		ev.currentTarget.dispatchEvent(new Event('tab_click', { bubbles: true }));
	}
</script>

<div
	{id}
	role="tab"
	class="svogg-tab"
	class:selected
	aria-selected={selected}
	aria-controls={controls}
	on:click|preventDefault={handleClick}
	tabindex={selected ? 0 : -1}
	on:keydown
>
	<slot />
</div>
