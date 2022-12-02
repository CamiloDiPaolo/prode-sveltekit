<script>
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;
</script>

<Navbar user={JSON.parse(data.user)[0]} />

<slot />
