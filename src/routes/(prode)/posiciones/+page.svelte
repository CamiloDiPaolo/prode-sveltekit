<script>
	export let data;

	// const posiciones = JSON.parse(data.posiciones);
	const usuarios = JSON.parse(data.usuarios);
	const user = JSON.parse(data.user)[0];

	const posiciones = JSON.parse(data.posiciones).map((posicion) => {
		posicion.usuario = usuarios.find((usuario) => usuario.id == posicion.usuario);
		return posicion;
	});
</script>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 ">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
			<tr>
				<th scope="col" class="py-3 px-6 text-center"> <p>Posicion</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Usuario</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>Puntos</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>ganadores acertados</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>resultados acertados</p> </th>
				<th scope="col" class="py-3 px-6 text-center"> <p>penales acertados</p> </th>
			</tr>
		</thead>
		<tbody>
			{#each posiciones as posicion, i}
				<tr class={`${posicion.usuario.id == user.id ? 'bg-green-100' : 'bg-white'} border-b`}>
					{#if i == 0}
						<td class="py-4 px-6 text-center text-gray-800 flex justify-center">
							<div class="flex items-center justify-center bg-yellow-500 rounded-full w-10 h-10 ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-gray-800"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
									/>
								</svg>
								{i + 1}
							</div>
						</td>
					{:else if i == 1}
						<td class="py-4 px-6 text-center text-gray-800 flex justify-center">
							<div class="flex items-center justify-center bg-gray-400 rounded-full w-10 h-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-gray-800"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
									/>
								</svg>
								{i + 1}
							</div>
						</td>
					{:else if i == 2}
						<td class="py-4 px-6 text-center text-gray-800 flex justify-center">
							<div class="flex items-center justify-center rounded-full w-10 h-10 bg-amber-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 text-gray-800"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
									/>
								</svg>
								{i + 1}
							</div>
						</td>
					{:else}
						<td class="py-4 px-6 text-center"> {i + 1} </td>
					{/if}
					<td class="py-4 px-6 text-center">
						{posicion.usuario.name}{` (${posicion.usuario.username})`}
					</td>
					<td class="py-4 px-6 text-center"> {posicion.puntos} </td>
					<td class="py-4 px-6 text-center"> {posicion.aciertos_ganador} </td>
					<td class="py-4 px-6 text-center"> {posicion.aciertos_resultado} </td>
					<td class="py-4 px-6 text-center"> {posicion.aciertos_penales} </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
