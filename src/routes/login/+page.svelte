<main class="min-h-screen bg-section z-10">
	<form
		method="POST"
		action="?/login"
		class="absolute top-1/2 left-1/2 h-74  shadow-2xl rounded-lg transform -translate-x-1/2 -translate-y-1/2 p-10 bg-gray-200"
	>
		<div class="mb-6">
			<label for="username" class="block mb-2 text-sm font-medium text-gray-900 "
				>Nombre de usuario</label
			>
			<input
				type="username"
				id="username"
				name="username"
				class="bg-white outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 "
				required
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
			<input
				type="password"
				id="password"
				name="password"
				class="bg-white border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 "
				required
			/>
		</div>

		<button
			type="submit"
			class="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center  ky-700 -sky-800"
			>Ingresar</button
		>
	</form>
</main>
