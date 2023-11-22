import '@testing-library/jest-dom';
import { render, fireEvent, within, act, type RenderResult } from '@testing-library/svelte';
import ChipInput from './ChipInput.svelte';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('ChipInput.svelte', () => {
	it('renders', () => {
		const { getByTestId } = render(ChipInput);

		const element = getByTestId('chip-input');
		expect(element).toBeInTheDocument();
	});

	it('renders default chips', () => {
		const chips = ['foo', 'bar', 'baz'];

		const { container } = render(ChipInput, { chips });

		const els = within(container).getAllByRole('row');

		expect(els.length).toBe(chips.length);

		for (let i = 0; i < chips.length; i++) {
			const text = chips[i];
			const el = els[i];

			expect(el).toHaveTextContent(text);
		}
	});

	it('adds chip', async () => {
		const { container, getByTestId } = render(ChipInput);
		const value = 'foo';
		const input = getByTestId('chip-input_input') as HTMLInputElement;

		fireEvent.input(input, { target: { value } });
		await fireEvent.submit(input);

		const chip = within(container).getByRole('row');

		expect(input.value).toBe('');
		expect(chip).toHaveTextContent(value);
	});

	describe('removes chip', () => {
		let Component: RenderResult<ChipInput>;
		let chip: HTMLElement;
		let button: HTMLElement;

		beforeEach(() => {
			Component = render(ChipInput, { chips: ['foo'] });

			chip = within(Component.container).getByRole('row');
			button = within(chip).getByRole('button');
		});

		it('by click', async () => {
			await fireEvent.click(button);
			expect(chip).not.toBeInTheDocument();
		});

		it('by keypress', async () => {
			await fireEvent.keyDown(button, { key: 'Enter' });
			expect(chip).not.toBeInTheDocument();
		});
	});

	describe('handles focus', () => {
		let Component: RenderResult<ChipInput>;
		let user: UserEvent;
		let chips: { chip: HTMLElement; cells: HTMLElement[] }[];

		beforeEach(() => {
			// Mock svelte in order to run onMount
			// https://github.com/testing-library/svelte-testing-library/issues/222
			vi.mock('svelte', async () => {
				const actual = (await vi.importActual('svelte')) as object;
				return {
					...actual,
					onMount: (await import('svelte/internal')).onMount
				};
			});

			user = userEvent.setup();
			Component = render(ChipInput, { chips: ['foo', 'bar', 'baz'] });
			chips = within(Component.container)
				.getAllByRole('row')
				.map((row) => ({
					chip: row,
					cells: within(row).getAllByRole('gridcell')
				}));
		});

		it('by tab', async () => {
			const { getByTestId } = Component;
			const input = getByTestId('chip-input_input') as HTMLInputElement;
			input.focus();

			await user.tab();
			expect(chips[0].cells[0]).toHaveFocus();

			await user.tab();
			// Should tab out
			expect(document.body).toHaveFocus();

			await user.tab({ shift: true });
			expect(chips[0].cells[0]).toHaveFocus();
		});

		it('by arrow keys', async () => {
			chips[0].cells[0].focus();

			await user.keyboard('{ArrowUp}');
			expect(chips[1].cells[0]).toHaveFocus();

			await user.keyboard('{ArrowUp}');
			expect(chips[2].cells[0]).toHaveFocus();

			// Chip is last in list, should not have moved focus
			await user.keyboard('{ArrowUp}');
			expect(chips[2].cells[0]).toHaveFocus();

			await user.keyboard('{ArrowRight}');
			// Second cell contains button which is the actual focusable element
			expect(within(chips[2].cells[1]).getByRole('button')).toHaveFocus();
			await user.keyboard('{ArrowRight}');
			// Last chip, should not have moved focus
			expect(within(chips[2].cells[1]).getByRole('button')).toHaveFocus();

			await user.keyboard('{ArrowLeft>2}');
			expect(within(chips[1].cells[1]).getByRole('button')).toHaveFocus();

			await user.keyboard('{ArrowDown}');
			expect(within(chips[0].cells[1]).getByRole('button')).toHaveFocus();

			await user.keyboard('{ArrowDown}');
			// First chip, should not have moved focus
			expect(within(chips[0].cells[1]).getByRole('button')).toHaveFocus();
		});
	});

	describe('emits change event', () => {
		it('on add', async () => {
			let result: string[];
			const { component, getByTestId } = render(ChipInput, { chips: ['foo', 'bar'] });

			const mock = vi.fn((ev) => (result = ev.detail.chips));
			component.$on('change', mock);

			const input = getByTestId('chip-input_input') as HTMLInputElement;
			fireEvent.input(input, { target: { value: 'baz' } });
			await fireEvent.submit(input);

			expect(mock).toHaveBeenCalledOnce();
			expect(result).toStrictEqual(['foo', 'bar', 'baz']);
		});

		it('on remove', async () => {
			const user = userEvent.setup();
			let result: string[];
			const { component, container } = render(ChipInput, {
				chips: ['foo', 'bar', 'baz']
			});

			const chips = within(container).getAllByRole('row');
			const button = within(chips[2]).getByRole('button');

			const mock = vi.fn((ev) => (result = ev.detail.chips));
			component.$on('change', mock);

			await user.click(button);

			expect(mock).toHaveBeenCalledOnce();
			expect(result).toStrictEqual(['foo', 'bar']);
		});
	});
});
