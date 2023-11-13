<script>
	import { Drawer } from '$lib';

	let open = false;
</script>

<button on:click={() => (open = true)}>Open</button>
<Drawer bind:open position="left" width="stretch">Testar</Drawer>
