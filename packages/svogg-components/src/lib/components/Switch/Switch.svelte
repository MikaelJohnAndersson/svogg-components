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

	function toggle() {
		checked = !checked;
	}

	/** @param {KeyboardEvent} ev */
	function handleKeyDown(ev) {
		if (ev.code == 'Enter' || ev.code == 'Space') toggle();
	}
</script>

<div
	role="switch"
	class="svogg-switch"
	aria-checked={checked}
	tabindex="0"
	class:checked
	on:click={toggle}
	on:keydown={handleKeyDown}
>
	<span class="thumb" />
	<input style="display: none;" type="checkbox" bind:checked {name} />
</div>
