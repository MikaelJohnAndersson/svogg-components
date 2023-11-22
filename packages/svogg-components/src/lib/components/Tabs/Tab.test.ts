import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Tab from './Tab.svelte';
import html from 'svelte-htm';

describe('Tab.svelte', () => {
	it('displays slotted content', () => {
		const { container } = render(html`<${Tab}>foo</${Tab}>`);
		expect(container).toHaveTextContent('foo');
	});

	it('sets aria-selected', () => {
		const { getByRole } = render(html`<${Tab} selected="true">foo</${Tab}>`);
		expect(getByRole('tab')).toHaveAttribute('aria-selected', 'true');
	});

	it('adds class when selected', () => {
		const { getByRole } = render(html`<${Tab} selected="true">foo</${Tab}>`);
		expect(getByRole('tab')).toHaveClass('selected');
	});

	it('dispatches custom event when clicked', async () => {
		const user = userEvent.setup();
		const { getByRole } = render(Tab);
		const tab = getByRole('tab');
		const dispatchEventSpy = vi.spyOn(tab, 'dispatchEvent');

		await user.click(tab);

		expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('tab_click'));
	});
});
