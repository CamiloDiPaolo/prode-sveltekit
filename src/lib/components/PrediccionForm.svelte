<script>
	import banderas from './banderas.json';
	import Spinner from 'svelte-spinner';

	export let partido;
	export let usuario;

	const prediccion = {
		usuario: usuario.id,
		partido: partido.id,
		resultado_local: 0,
		resultado_visita: 0,
		ganador: 'empate',
		ganador_penales: null
	};
	let loading = false;

	$: prediccion.ganador =
		prediccion.resultado_local == prediccion.resultado_visita
			? 'empate'
			: prediccion.resultado_local > prediccion.resultado_visita
			? 'local'
			: 'visita';
	$: prediccion.ganador_penales =
		prediccion.resultado_local == prediccion.resultado_visita ? prediccion.ganador_penales : null;

	const flag = (country, width, height) => {
		let flag;
		Object.entries(banderas).forEach((obj) => {
			if (obj[1] == country) flag = obj[0];
		});
		return `https://flagcdn.com/${width}x${height}/${flag}.png`;
	};

	const submitPrediccion = async (e) => {
		if (loading) return;
		loading = true;

		const data = new FormData();

		data.append('usuario', prediccion.usuario);
		data.append('partido', prediccion.partido);
		data.append('resultado_local', prediccion.resultado_local);
		data.append('resultado_visita', prediccion.resultado_visita);
		data.append('ganador', prediccion.ganador);
		if (prediccion.ganador_penales) data.append('ganador_penales', prediccion.ganador_penales);

		await fetch('?/prediccion', {
			method: 'POST',
			body: data
		});

		location.reload();
	};
</script>

<div class="fixed z-30 top-0 left-0 w-screen h-screen bg-black opacity-50" />
<form
	class="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg flex flex-col gap-2"
>
	<p class="text-center">
		{partido.nombre}
	</p>
	<div class="flex justify-around">
		<img src={flag(partido.local.nombre, 28, 21)} alt="bandera local" />
		<p>-</p>
		<img src={flag(partido.visita.nombre, 28, 21)} alt="bandera visita" />
	</div>
	<div class="flex justify-around gap-5">
		<input
			class="bg-gray-300 w-20 outline-none text-center"
			type="number"
			bind:value={prediccion.resultado_local}
		/>
		<input
			class="bg-gray-300 w-20 outline-none text-center"
			type="number"
			bind:value={prediccion.resultado_visita}
		/>
	</div>
	{#if ['8vos', '4tos', 'semifinal', 'final', 'tercer-puesto'].includes(partido.ronda) && prediccion.resultado_local == prediccion.resultado_visita}
		<div class="flex flex-col items-center">
			<p>Penales</p>
			<select class="bg-gray-300 w-20 outline-none " bind:value={prediccion.ganador_penales}>
				<option value="local">{partido.local.nombre}</option>
				<option value="visita">{partido.visita.nombre}</option>
			</select>
		</div>
	{/if}
	<button
		on:click={submitPrediccion}
		class="bg-sky-400 hover:bg-sky-500 p-2 rounded-lg text-gray-700 fles items-center justify-center"
	>
		{#if loading}
			<Spinner />
		{:else}
			Subir prediccion
		{/if}
	</button>
	<button on:click class="bg-rose-400 hover:bg-rose-500 p-2 rounded-lg text-gray-700">
		Cancelar
	</button>
</form>
