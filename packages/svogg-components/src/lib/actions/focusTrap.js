import { getFocusableElements } from '$lib/utils';

/** @type {import('svelte/action').Action}  */
export default function (node) {
	const focusableElements = getFocusableElements(node);
	if (!focusableElements.length) return {};

	let /** @type {HTMLElement}*/ firstElement, /** @type {HTMLElement}*/ lastElement;
	firstElement = focusableElements[0];
	lastElement = focusableElements[focusableElements.length - 1];
	firstElement.focus(); // Focus first element on mount

	/** @param {KeyboardEvent} ev */
	function onKeyDown(ev) {
		if (ev.key === 'Tab') {
			if (ev.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					ev.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement.focus();
					ev.preventDefault();
				}
			}
		}
	}

	node.addEventListener('keydown', onKeyDown, true);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeyDown, true);
		}
	};
}
