import { json } from '@sveltejs/kit';
// import supabase from '$lib/server/db/connection';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function GET({ url }) {
	const { data: usuarios } = await supabase.from('usuarios').select('*');
	const { data: resultados } = await supabase.from('resultados').select('*');

	console.log('|| Termne de cargar los usuarios');
	const puntuaciones = [];

	for (let i = 0; i < usuarios.length; i++) {
		const usuario = usuarios[i];

		const { data: predicciones } = await supabase
			.from('predicciones')
			.select('*')
			.eq('usuario', usuario.id);

		console.log(
			`||[${i}-${usuarios.length}] Termine de cargar las predicciones del usuario ${usuario.username} `
		);

		let puntuacion = {
			usuario: usuario.id,
			puntos: 0,
			aciertos_ganador: 0,
			aciertos_resultado: 0,
			aciertos_penales: 0
		};

		for (let j = 0; j < predicciones.length; j++) {
			const prediccion = predicciones[j];

			const resultado = resultados.find((resu) => resu.partido == prediccion.partido);
			if (!resultado) continue;
			// chequeamos el resultado de la prediccion
			const aciertoGanador = resultado.ganador == prediccion.ganador;
			const aciertoResultado =
				resultado.resultado_local === prediccion.resultado_local &&
				resultado.resultado_visita === prediccion.resultado_visita;
			const aciertoPenales =
				resultado.ganador_penales && resultado.ganador_penales == prediccion.ganador_penales;

			let puntos = aciertoResultado ? 5 : aciertoGanador ? 3 : 0;
	                puntos = aciertoPenales ? puntos + 2 : puntos;		

			puntuacion.puntos += puntos;
			puntuacion.aciertos_ganador += aciertoGanador ? 1 : 0;
			puntuacion.aciertos_resultado += aciertoResultado ? 1 : 0;
			puntuacion.aciertos_penales += aciertoPenales ? 1 : 0;
		}
		puntuaciones.push(puntuacion);
	}
	await supabase.from('posiciones').delete().neq('id', 0);
	await supabase.from('posiciones').insert(
		puntuaciones.sort((posAnt, posAct) => {
			if (posAnt.puntos > posAct.puntos) return -1;
			if (posAnt.puntos < posAct.puntos) return 1;
			return 0;
		})
	);

	return json({
		status: 'se actualizo la tabla'
	});
}
