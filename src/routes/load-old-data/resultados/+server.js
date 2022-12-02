import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import resultados from '$lib/old_data/resultados.json';

export async function GET({ url }) {
	const { data: partidos } = await supabase.from('partidos').select('*');

	await supabase.from('resultados').insert(
		resultados.map((resultado) => {
			return {
				resultado_visita: resultado.resultadoVisita,
				resultado_local: resultado.resultadoLocal,
				partido: partidos.find((partido) => partido.nombre == resultado.partido.nombre).id,
				ganador: resultado.ganador.toLowerCase(),
				ganador_penales: resultado.ganadorPenales?.toLowerCase() || null
			};
		})
	);

	return json({
		status: 'ok'
	});
}
