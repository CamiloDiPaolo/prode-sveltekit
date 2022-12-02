import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import selecciones from '$lib/old_data/selecciones.json';

export async function GET({ url }) {
	await supabase.from('selecciones').insert(
		selecciones.map((seleccion) => {
			return {
				nombre: seleccion.seleccion,
				acronimo: seleccion.acronimo
			};
		})
	);

	return json({
		status: 'ok'
	});
}
