import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import partidos from '$lib/old_data/partidos.json';

export async function GET({ url }) {
	const { data: selecciones } = await supabase.from('selecciones').select('*');

	await supabase.from('partidos').insert(
		partidos.map((partido) => {
			return {
				nombre: partido.nombre,
				grupo: partido.grupo,
				ronda: partido.ronda,
				equipo_visita: selecciones.find(
					(seleccion) => seleccion.acronimo == partido.equipoVisita.acronimo
				).id,
				equipo_local: selecciones.find(
					(seleccion) => seleccion.acronimo == partido.equipoLocal.acronimo
				).id,
				fecha: new Date(`${partido.fechainicio}T${partido.horario}`),
				jugado: partido.jugado
			};
		})
	);

	return json({
		status: 'ok'
	});
}
