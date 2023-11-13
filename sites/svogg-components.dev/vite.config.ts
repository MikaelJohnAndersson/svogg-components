import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import sveld from 'vite-plugin-sveld';

// Import package.json version
import { readFileSync } from 'fs';
const json = readFileSync('../../packages/svogg-components/package.json', 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
	plugins: [sveltekit(), sveld()],
	define: {
		__PACKAGE__: pkg
	}
});
