import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import predicciones from '$lib/old_data/predicciones.json';

export async function GET({ url }) {
	const { data: partidos } = await supabase.from('partidos').select('*');
	const { data: usuarios } = await supabase.from('usuarios').select('*');

	await supabase.from('predicciones').insert(
		predicciones.map((prediccion) => {
			return {
				usuario: usuarios.find((usuario) => usuario.username == prediccion.jugador.nombreUsuario)
					.id,
				partido: partidos.find((partido) => partido.nombre == prediccion.partido.nombre).id,
				resultado_local: prediccion.resultadoLocal,
				resultado_visita: prediccion.resultadoVisita,
				ganador: prediccion.ganador.toLowerCase(),
				ganador_penales: prediccion.ganadorPenales?.toLowerCase() || null
			};
		})
	);

	return json({
		status: 'ok'
	});
}
