<script>
	import { createEventDispatcher, onMount, tick } from 'svelte';

	// https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/layout-grids/#
	// TODO: Implement required

	/**
	 * @event {{chips: string[]}} change Fires whenever a chip is added or removed, dispatching the new value.
	 */

	/**
	 * @restProps {input}
	 */

	/**
	 * @type {string[]}
	 */
	export let chips = [];

	/**
	 * HTML `placeholder` attribute
	 * @type {string | undefined}
	 */
	export let placeholder = undefined;

	/** @type {string} */
	let value;

	const dispatch = createEventDispatcher();

	const rootStyles =
		'display:inline-flex; flex-direction:column; gap: 0.5rem; height: auto; min-width: 0px;';

	const chipListStyles = 'display: flex; gap: 0.25rem; flex-wrap: wrap;';

	const chipIconStyles = 'height: 1rem; aspect-ratio: 1/1; pointer-events:none;';

	/** @type {HTMLDivElement} */
	let grid;

	/** @param {HTMLElement} _grid*/
	function setFirstChipFocusable(_grid) {
		const rows = _grid.querySelectorAll('[role="row"]');
		const firstRow = rows[0];
		if (firstRow) {
			const cells = firstRow.querySelectorAll('[tabindex]');
			const firstCell = cells[0];
			firstCell.setAttribute('tabindex', '0');
		}
	}

	onMount(() => {
		setFirstChipFocusable(grid);
	});

	/** @param {SubmitEvent} ev */
	async function handleSubmit(ev) {
		if (value) {
			chips = [...chips, value];
			value = '';
			dispatch('change', { chips });

			await tick();
			const rows = grid.querySelectorAll('[role="row"]');
			if (rows.length == 1) {
				// A new chip was added, set it as focusable
				setFirstChipFocusable(grid);
			}
		}
	}

	/** @param {MouseEvent | KeyboardEvent} ev */
	function handleDeleteChip(ev) {
		if (ev.type == 'keydown' && ev.code !== 'Space' && ev.key !== 'Enter') return;
		const target = /** @type {HTMLSpanElement} */ (ev.target);
		const chip = target.getAttribute('data-chip');
		if (!chip) return console.error('not a chip');
		chips = chips.filter((c) => c !== chip);
		// TODO: Focus next/prev focusable cell
		dispatch('change', { chips });
	}

	/** @param {KeyboardEvent} ev */
	function handleChipKeyDown(ev) {
		if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
		ev.preventDefault();
		const chip = /** @type {HTMLElement} */ (ev.currentTarget);
		const originalTarget = /** @type {HTMLElement} */ (ev.target);
		const children = /** @type {HTMLElement[]} */ ([...chip.querySelectorAll('[tabindex]')]);
		const index = children.findIndex((n) => n == originalTarget);

		/**
		 * @param {HTMLElement} from
		 * @param {HTMLElement} to
		 */
		function moveFocusFromTo(from, to) {
			from.setAttribute('tabindex', '-1');
			to.setAttribute('tabindex', '0');
			to.focus();
		}

		if (ev.key == 'ArrowRight') {
			if (index + 1 < children.length) {
				// Focus next gridcell
				const next = children[index + 1];
				moveFocusFromTo(originalTarget, next);
			} else {
				chip.dispatchEvent(
					new CustomEvent('arrow_right', {
						detail: {
							originalTarget
						}
					})
				);
			}
		}

		if (ev.key == 'ArrowLeft') {
			if (index - 1 >= 0) {
				// Focus previous gridcell
				const prev = children[index - 1];
				moveFocusFromTo(originalTarget, prev);
			} else {
				chip.dispatchEvent(
					new CustomEvent('arrow_left', {
						detail: {
							originalTarget
						}
					})
				);
			}
		}

		if (ev.key == 'ArrowUp') {
			chip.dispatchEvent(
				new CustomEvent('arrow_up', {
					detail: {
						originalTarget
					}
				})
			);
		}

		if (ev.key == 'ArrowDown') {
			chip.dispatchEvent(
				new CustomEvent('arrow_down', {
					detail: {
						originalTarget
					}
				})
			);
		}
	}

	/** @type {import('svelte/action').Action}  */
	function handleArrowKeys(node) {
		/** @param {CustomEvent} ev */
		function onArrowRight(ev) {
			const target = /** @type {HTMLSpanElement} */ ev.target;
			const index = +target.getAttribute('data-index');

			const rows = node.querySelectorAll('[role="row"]');
			const el = rows[index + 1]; // Get next chip in list

			if (el) {
				const cols = el.querySelectorAll('[tabindex]');
				const firstCol = cols[0];
				if (firstCol) {
					ev.detail.originalTarget.setAttribute('tabindex', '-1');
					firstCol.setAttribute('tabindex', '0');
					firstCol.focus();
				}
			}
		}

		/** @param {CustomEvent} ev */
		function onArrowLeft(ev) {
			const target = /** @type {HTMLSpanElement} */ ev.target;
			const index = +target.getAttribute('data-index');

			const rows = node.querySelectorAll('[role="row"]');
			const el = rows[index - 1]; // Get prev chip in list

			if (el) {
				const cols = el.querySelectorAll('[tabindex]');
				const lastCol = cols[cols.length - 1];
				if (lastCol) {
					ev.detail.originalTarget.setAttribute('tabindex', '-1');
					lastCol.setAttribute('tabindex', '0');
					lastCol.focus();
				}
			}
		}

		/** @param {CustomEvent} ev */
		function onArrowUp(ev) {
			const target = /** @type {HTMLSpanElement} */ ev.target;
			const index = +target.getAttribute('data-index');

			const rows = node.querySelectorAll('[role="row"]');
			const el = rows[index + 1]; // Get next chip in list

			if (el) {
				const index = +ev.detail.originalTarget.getAttribute('data-colindex');
				const cols = el.querySelectorAll('[tabindex]');
				const col = cols[index];
				if (col) {
					ev.detail.originalTarget.setAttribute('tabindex', '-1');
					col.setAttribute('tabindex', '0');
					col.focus();
				}
			}
		}

		/** @param {CustomEvent} ev */
		function onArrowDown(ev) {
			const target = /** @type {HTMLSpanElement} */ ev.target;
			const index = +target.getAttribute('data-index');

			const rows = node.querySelectorAll('[role="row"]');
			const el = rows[index - 1]; // Get previous chip in list

			if (el) {
				const index = +ev.detail.originalTarget.getAttribute('data-colindex');
				const cols = el.querySelectorAll('[tabindex]');
				const col = cols[index];
				if (col) {
					ev.detail.originalTarget.setAttribute('tabindex', '-1');
					col.setAttribute('tabindex', '0');
					col.focus();
				}
			}
		}

		node.addEventListener('arrow_right', onArrowRight, true);
		node.addEventListener('arrow_left', onArrowLeft, true);
		node.addEventListener('arrow_up', onArrowUp, true);
		node.addEventListener('arrow_down', onArrowDown, true);

		return {
			destroy() {
				node.removeEventListener('arrow_right', onArrowRight, true);
				node.removeEventListener('arrow_left', onArrowLeft, true);
				node.removeEventListener('arrow_up', onArrowUp, true);
				node.removeEventListener('arrow_down', onArrowDown, true);
			}
		};
	}
</script>

<div style={rootStyles} data-testid="chip-input">
	<input style="display:none;" value={chips} {...$$restProps} />
	<form
		style="display:contents;"
		on:submit|preventDefault={handleSubmit}
		data-testid="chip-input_form"
	>
		<input
			type="text"
			class="svogg-input"
			bind:value
			{placeholder}
			data-testid="chip-input_input"
		/>
	</form>
	<div role="grid" style={chipListStyles} use:handleArrowKeys bind:this={grid}>
		{#each chips as chip, i}
			<span
				class="svogg-chip"
				role="row"
				tabindex="-1"
				on:keydown={handleChipKeyDown}
				data-index={i}
			>
				<span style="pointer-events: none;" role="gridcell" tabindex="-1" data-colindex={0}>
					{chip}
				</span>
				<span role="gridcell">
					<span
						role="button"
						style="display:flex; align-items: center;"
						data-chip={chip}
						on:click={handleDeleteChip}
						on:keydown={handleDeleteChip}
						tabindex="-1"
						aria-label="Remove"
						data-colindex={1}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={chipIconStyles}>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</span>
				</span>
			</span>
		{/each}
	</div>
</div>
