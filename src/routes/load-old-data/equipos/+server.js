import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import equipos from '$lib/old_data/equipos.json';

export async function GET({ url }) {
	await supabase.from('equipos').insert(
		equipos.map((equipo) => {
			return {
				nombre: equipo.nombre,
				acronimo: equipo.acronimo
			};
		})
	);

	return json({
		status: 'ok'
	});
}
