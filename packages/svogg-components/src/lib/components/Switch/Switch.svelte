<script>
	/**
	 * Checked state
	 * @type {boolean}
	 */
	export let checked = false;

	/**
	 * HTML `name` attribute
	 * @type {string}
	 */
	export let name = undefined;

	/**
	 * HTML `aria-label` attribute for the switch element
	 */
	export let label = undefined;

	function toggle() {
		checked = !checked;
	}

	/** @param {KeyboardEvent} ev */
	function handleKeyDown(ev) {
		if (['Enter', 'Space'].includes(ev.code)) toggle();
	}
</script>

<div
	role="switch"
	class="svogg-switch"
	aria-checked={checked}
	aria-label={label}
	tabindex="0"
	class:checked
	on:click={toggle}
	on:keydown={handleKeyDown}
>
	<span class="thumb" />
	<input style="display: none;" type="checkbox" bind:checked {name} />
</div>
