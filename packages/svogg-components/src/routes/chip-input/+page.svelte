<script lang="ts">
	import { ChipInput } from '$lib';

	let chips = ['Spiders', 'Bats', 'Scorpions'];
</script>

<h1>ChipInput</h1>
<ChipInput placeholder="Creepy animals..." bind:chips />
