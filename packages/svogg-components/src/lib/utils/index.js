/**
 * @param {HTMLElement} node
 * @returns {(NodeList | Array)}
 */
export function getFocusableElements(node) {
	return node.querySelectorAll(
		'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
	);
}
