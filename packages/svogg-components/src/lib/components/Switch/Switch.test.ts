import '@testing-library/jest-dom';
import { render, type RenderResult } from '@testing-library/svelte';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import Switch from './Switch.svelte';

describe('Switch.svelte', () => {
	let user: UserEvent;
	let el: HTMLElement;
	let Component: RenderResult<Switch>;

	beforeEach(() => {
		user = userEvent.setup();
		Component = render(Switch);
		el = Component.getByRole('switch');
	});

	it('toggles aria-checked on click', async () => {
		expect(el).not.toHaveAttribute('aria-checked', 'true');
		await user.click(el);
		expect(el).toHaveAttribute('aria-checked', 'true');
	});

	it('adds class when checked', async () => {
		expect(el).not.toHaveClass('checked');
		await user.click(el);
		expect(el).toHaveClass('checked');
	});

	it('toggles internal input state on click', async () => {
		const { getByRole } = Component;
		expect(getByRole('checkbox', { hidden: true })).not.toBeChecked();
		await user.click(el);
		expect(getByRole('checkbox', { hidden: true })).toBeChecked();
	});

	describe('toggles aria-checked on', () => {
		it('enter', async () => {
			el.focus();

			expect(el).not.toHaveAttribute('aria-checked', 'true');
			await user.keyboard('{Enter}');
			expect(el).toHaveAttribute('aria-checked', 'true');
		});

		it('space', async () => {
			el.focus();

			expect(el).not.toHaveAttribute('aria-checked', 'true');
			await user.keyboard('{ }');
			expect(el).toHaveAttribute('aria-checked', 'true');
		});
	});
});
