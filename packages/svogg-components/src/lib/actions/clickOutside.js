/**
 * @callback ClickOutsideHandler
 * @param {MouseEvent} event
 * @returns {void}
 */

/** @type {import('svelte/action').Action<HTMLElement, ClickOutsideHandler>}  */
export default function (node, handler) {
	/** @param {MouseEvent} event */
	const onClick = (event) => {
		const target = /**@type {Node} */ (event.target);
		if (!node.contains(target) && !event.defaultPrevented) handler(event);
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}
