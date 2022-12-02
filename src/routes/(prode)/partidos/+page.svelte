<script>
	import banderas from '$lib/components/banderas.json';
	import PrediccionForm from '$lib/components/PrediccionForm.svelte';
	export let data;

	// const partidos = JSON.parse(data.partidos);
	const selecciones = JSON.parse(data.selecciones);
	const resultados = JSON.parse(data.resultados);
	const predicciones = JSON.parse(data.predicciones);

	const partidos = JSON.parse(data.partidos).map((partido) => {
		partido.prediccion = predicciones.find((prediccion) => prediccion.partido == partido.id);
		partido.resultado = resultados.find((resultado) => resultado.partido == partido.id);
		partido.local = selecciones.find((seleccion) => seleccion.id == partido.equipo_local);
		partido.visita = selecciones.find((seleccion) => seleccion.id == partido.equipo_visita);
		return partido;
	});

	let prediccionForm = false;
	let partidoForm = 0;

	const flag = (country, width, height) => {
		let flag;
		Object.entries(banderas).forEach((obj) => {
			if (obj[1] == country) flag = obj[0];
		});
		return `https://flagcdn.com/${width}x${height}/${flag}.png`;
	};

	const prediccionHabilidata = (partido) => {
		if (partido.jugado) return false;

		const now = new Date();
		const date = new Date(partido.fecha);

		if (date.getTime() - now.getTime() < 1000 * 60 * 60 * 24) return false;

		return true;
	};

	const getGanadorPenales = (partido) => {
		const resultado = resultados.find((resultado) => resultado.partido == partido.id);

		if (resultado.ganador_penales == 'visita')
			return selecciones.find((seleccion) => seleccion.id == partido.equipo_visita).nombre;
		else return selecciones.find((seleccion) => seleccion.id == partido.equipo_local).nombre;
	};

	const getPrediccionPenales = (prediccion, partido) => {
		if (prediccion.ganador_penales == 'visita')
			return selecciones.find((seleccion) => seleccion.id == partido.equipo_visita).nombre;
		else return selecciones.find((seleccion) => seleccion.id == partido.equipo_local).nombre;
	};
</script>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 ">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
			<tr>
				<th scope="col" class="py-3 px-6 text-center"> <p>Partido</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Grupo</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Ronda</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Resultado</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Penales</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Prediccion</p> </th>
			</tr>
		</thead>
		<tbody>
			{#each partidos.sort((partido1, partido2) => {
				if (partido1.grupo > partido2.grupo) return 1;
				if (partido1.grupo < partido2.grupo) return -1;
				return 0;
			}) as partido}
				<tr class="bg-white border-b ">
					<td
						class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap flex gap-3 justify-center"
					>
						<img src={flag(partido.local.nombre, 28, 21)} alt="bandera local" />
						<p>
							{partido.nombre}
						</p>
						<img src={flag(partido.visita.nombre, 28, 21)} alt="bandera local" />
					</td>
					<td class="py-4 px-6 text-center"> {partido.grupo} </td>
					<td class="py-4 px-6 text-center"> {partido.ronda} </td>
					{#if partido.resultado}
						<td class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap ">
							<div class="flex gap-3 justify-center">
								<img src={flag(partido.local.nombre, 28, 21)} alt="bandera local" />
								<p>
									{partido.resultado.resultado_local} -
									{partido.resultado.resultado_visita}
								</p>
								<img src={flag(partido.visita.nombre, 28, 21)} alt="bandera local" />
							</div>
						</td>
					{:else}
						<td class="py-4 px-6 text-center"> No disponible </td>
					{/if}
					{#if partido.resultado && partido.resultado.ganador_penales}
						<td
							class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap flex justify-center"
						>
							<img src={flag(getGanadorPenales(partido), 28, 21)} alt="bandera local" />
						</td>
					{:else}
						<td class="py-4 px-6 text-center"> Sin penales </td>
					{/if}
					{#if partido.prediccion}
						<td class="py-4 px-6 text-center font-medium text-gray-900  ">
							<div class="flex gap-3 justify-center">
								<img src={flag(partido.local.nombre, 28, 21)} alt="bandera local" />
								<p>
									{partido.prediccion.resultado_local} - {partido.prediccion.resultado_visita}
								</p>
								<img src={flag(partido.visita.nombre, 28, 21)} alt="bandera local" />
								{#if partido.prediccion.ganador_penales}
									<p>|</p>
									<img
										src={flag(getPrediccionPenales(partido.prediccion, partido), 28, 21)}
										alt="bandera local"
									/>
								{/if}
							</div>
						</td>
					{:else if prediccionHabilidata(partido)}
						<td class="py-4 px-6 text-center">
							<button
								class="bg-sky-400 hover:bg-sky-500 p-2 rounded-lg text-gray-700"
								on:click={(e) => {
									(prediccionForm = true), (partidoForm = partido);
								}}>Hacer predicicon!</button
							>
						</td>
					{:else}
						<td class="py-4 px-6 text-center"> La prediccion no esta habilitada 😢</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
{#if prediccionForm}
	<PrediccionForm partido={partidoForm} usuario={JSON.parse(data.user)[0]} />
{/if}
