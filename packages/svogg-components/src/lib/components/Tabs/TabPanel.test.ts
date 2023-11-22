import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import TabPanel from './TabPanel.svelte';

describe('TabPanel.svelte', () => {
	it('is hidden when not active', () => {
		const { getByTestId } = render(TabPanel, {
			id: 'panel',
			labelledby: 'tab',
			active: false
		});
		expect(getByTestId('tab-panel')).not.toBeVisible();
	});

	it('is visible when active', () => {
		const { getByTestId } = render(TabPanel, {
			id: 'panel',
			labelledby: 'tab',
			active: true
		});
		expect(getByTestId('tab-panel')).toBeVisible();
	});
});
