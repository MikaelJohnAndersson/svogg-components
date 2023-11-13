<script>
	import { fly, fade } from 'svelte/transition';
	import { clickOutside, focusTrap } from '$lib/actions';
	import { createEventDispatcher } from 'svelte';

	/**
	 * Drawer open state
	 * @type {boolean}
	 */
	export let open;

	/**
	 * HTML `id` attribute. Commonly used in conjunction with `aria-controls` on controlling element.
	 * @type {(string | undefined)}
	 */
	export let id = undefined;

	/**
	 * Fit to content or stretch across screen. Does nothing if position is `top` or `bottom`.
	 * @type {'auto' | 'stretch'}
	 */
	export let width = 'auto';

	/**
	 * In/out transition duration
	 * @type {number}
	 */
	export let duration = 200;

	/**
	 * Drawer starting position
	 * @type {'top' | 'bottom' | 'left' | 'right'}
	 */
	export let position = 'right';

	/**
	 * HTML `aria-role` attribute
	 * @type {string}
	 */
	export let role = 'complementary';

	/**
	 * HTML tag
	 * @type {string}
	 */
	export let as = 'div';

	const overlayStyles =
		'position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px; isolation: isolate;';

	const baseDrawerStyles = 'position: fixed; z-index: 20; top: 0; bottom: 0;';
	let drawerStyles = getDrawerStyles(position);

	/** @param {string} _position */
	function getDrawerStyles(_position) {
		switch (_position) {
			case 'top':
			case 'bottom':
				return `${baseDrawerStyles} left: 0px; right: 0px;`;
			case 'left':
				return `${baseDrawerStyles} left: 0px; ${
					width === 'stretch' ? 'inset-inline-end: 3rem;' : ''
				}`;
			case 'right':
				return `${baseDrawerStyles} right: 0px; ${
					width === 'stretch' ? 'inset-inline-start: 3rem;' : ''
				}`;
		}
	}

	//const dispatch = createEventDispatcher();
	function handleClickOutside() {
		open = false;
		//dispatch('click_outside');
	}

	$: transitionTo = getTransitionTo(position);

	/**
	 * @param {'top' | 'bottom' | 'left' | 'right'} _position
	 * @returns {{ x: (number | string), y: (number | string) }} Start/end positions
	 */
	function getTransitionTo(_position) {
		switch (_position) {
			case 'top':
				return { x: 0, y: '-100%' };
			case 'bottom':
				return { x: 0, y: '100%' };
			case 'right':
				return { x: '100%', y: 0 };
			case 'left':
				return { x: '-100%', y: 0 };
			default:
				// 'right' position
				return { x: '100%', y: 0 };
		}
	}

	/** @param {KeyboardEvent} ev */
	function handleKeyDown(ev) {
		if (ev.key === 'Escape') open = false;
	}
</script>

{#if open}
	<div class="svogg-drawer-overlay" style={overlayStyles} transition:fade={{ duration: 100 }} />
	<svelte:element
		this={as}
		style={drawerStyles}
		class="svogg-drawer"
		transition:fly={{ duration, opacity: 100, ...transitionTo }}
		use:clickOutside={handleClickOutside}
		on:keydown={handleKeyDown}
		use:focusTrap
		{role}
		{id}
	>
		<slot />
	</svelte:element>
{/if}
