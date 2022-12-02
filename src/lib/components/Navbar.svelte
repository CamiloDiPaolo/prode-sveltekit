<script>
	import { Icon, Table, DocumentReport, Upload } from 'svelte-hero-icons';
	import Spinner from 'svelte-spinner';

	export let user;
	let loading = false;

	const reloadTable = async () => {
		if (loading) return;
		try {
			loading = true;
			const res = await fetch('/reload-table');
			const data = await res.json();
			loading = false;
			alert(data.status);
		} catch (err) {
			loading = false;
			console.log(err);
			alert(err);
		} finally {
			loading = false;
		}
	};
</script>

<a
	href="/posiciones"
	title="tabla de posiciones"
	class="p-5 bg-sky-400 fixed bottom-5 left-5 flex justify-center items-center rounded-full z-20 hover:bg-sky-500"
>
	<Icon
		src={Table}
		class="w-8 h-8 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
	/>
</a>
<a
	href="/partidos"
	title="partidos, resultados y posiciones"
	class="p-5 bg-sky-400 fixed bottom-28 left-5 flex justify-center items-center rounded-full z-20 hover:bg-sky-500"
>
	<Icon
		src={DocumentReport}
		class="w-8 h-8 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
	/>
</a>

{#if ['PRODEMASTER', 'MOTERO'].includes(user.username)}
	<button
		title="Actualizar la tabla"
		class="p-5 bg-rose-400 fixed bottom-5 right-5 flex justify-center items-center rounded-full z-20 hover:bg-rose-500"
		on:click={reloadTable}
	>
		{#if loading}
			<Spinner />
		{:else}
			<Icon
				src={Upload}
				class="w-8 h-8 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			/>
		{/if}
	</button>
{/if}
