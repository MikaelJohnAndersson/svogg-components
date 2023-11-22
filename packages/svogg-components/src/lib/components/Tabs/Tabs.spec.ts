import '@testing-library/jest-dom';
import { render, type RenderResult } from '@testing-library/svelte';
import Tabs from './Tabs.spec.svelte';

import userEvent, { type UserEvent } from '@testing-library/user-event';
import type { SvelteComponent } from 'svelte';

let Component: RenderResult<SvelteComponent>;
let selectedTab = 'tab-foo';
let tabs: HTMLElement[];
let user: UserEvent;

describe('Tabs', () => {
	beforeEach(() => {
		user = userEvent.setup();

		const _tabs = [
			{
				label: 'foo',
				tabId: 'tab-foo',
				panelId: 'panel-foo',
				panelContent: 'panel-foo'
			},
			{
				label: 'bar',
				tabId: 'tab-bar',
				panelId: 'panel-bar',
				panelContent: 'panel-bar'
			},
			{
				label: 'baz',
				tabId: 'tab-baz',
				panelId: 'panel-baz',
				panelContent: 'panel-baz'
			}
		];

		Component = render(Tabs, { tabs: _tabs, selectedTab });
		tabs = Component.getAllByRole('tab');
	});

	it('sets aria-selected on clicked tab', async () => {
		expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

		await user.click(tabs[1]);

		expect(tabs[0]).not.toHaveAttribute('aria-selected', 'true');
		expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
	});

	it('sets aria-selected on keyboard navigation', async () => {
		tabs[0].focus();
		await user.keyboard('{ArrowRight}');
		expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
		expect(tabs[0]).not.toHaveAttribute('aria-selected', 'true');
	});

	it('displays only the active tab panel', async () => {
		const { getByText } = Component;
		expect(getByText('panel-foo')).toBeVisible();
		expect(getByText('panel-bar')).not.toBeVisible();

		await user.click(tabs[1]);

		expect(getByText('panel-foo')).not.toBeVisible();
		expect(getByText('panel-bar')).toBeVisible();
	});

	describe('handles focus', () => {
		it('by tab', async () => {
			const { getByRole } = Component;

			await user.tab();
			expect(tabs[0]).toHaveFocus();

			await user.tab();
			expect(getByRole('tabpanel')).toHaveFocus();

			await user.tab();
			expect(document.body).toHaveFocus();

			await user.tab({ shift: true });
			expect(getByRole('tabpanel')).toHaveFocus();
		});

		it('by arrow keys', async () => {
			tabs[0].focus();
			await user.keyboard('{ArrowRight}');
			expect(tabs[1]).toHaveFocus();
			await user.keyboard('{ArrowRight}');
			expect(tabs[2]).toHaveFocus();
			await user.keyboard('{ArrowRight}');
			expect(tabs[0]).toHaveFocus();
			await user.keyboard('{ArrowLeft}');
			expect(tabs[2]).toHaveFocus();
		});
	});
});
