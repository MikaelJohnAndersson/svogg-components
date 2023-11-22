<script>
	/**
	 * HTML `id` attribute of selected tab
	 * @type {string}
	 */
	export let selectedTab;

	/** @type {import('svelte/action').Action}  */
	function handleTabClick(node) {
		/** @param {Event} ev */
		function onTabClick(ev) {
			ev.stopPropagation(); // Prevent event from bubbling to potential TabList ancestors
			const tab = /** @type {HTMLDivElement} */ (ev.target);
			const selected = tab.getAttribute('aria-selected');
			if (selected !== 'true') selectedTab = tab.id;
		}

		node.addEventListener('tab_click', onTabClick, false);

		return {
			destroy() {
				node.removeEventListener('tab_click', onTabClick, false);
			}
		};
	}

	/** @param {KeyboardEvent} ev */
	function handleKeyDown(ev) {
		if (!['ArrowRight', 'ArrowLeft'].includes(ev.key)) return;

		const target = /** @type {HTMLDivElement} */ (ev.target);
		if (target.getAttribute('role') !== 'tab') return;

		const tabs = this.querySelectorAll('[role="tab"]');
		const index = [...tabs].indexOf(target);

		let newIndex;
		if (ev.key === 'ArrowRight') {
			newIndex = index + 1 >= tabs.length ? 0 : index + 1;
		}
		if (ev.key === 'ArrowLeft') {
			newIndex = index - 1 < 0 ? tabs.length - 1 : index - 1;
		}

		const nextTab = /** @type {HTMLDivElement} */ (tabs[newIndex]);
		selectedTab = nextTab.id;
		nextTab.focus();
	}
</script>

<div style="display:contents;" use:handleTabClick>
	<div
		role="tablist"
		style="display: flex;"
		class="svogg-tablist"
		on:keydown={handleKeyDown}
		tabindex="-1"
	>
		<slot name="tabs" />
	</div>
	<slot name="panel" />
</div>
