import supabase from '$lib/server/db/connection';

export const load = async ({ parent }) => {
	const { user } = await parent();
	const { data: partidos } = await supabase.from('partidos').select('*');
	const { data: resultados } = await supabase.from('resultados').select('*');
	const { data: selecciones } = await supabase.from('selecciones').select('*');
	const { data: predicciones } = await supabase
		.from('predicciones')
		.select('*')
		.eq('usuario', JSON.parse(user)[0].id);

	return {
		partidos: JSON.stringify(partidos),
		resultados: JSON.stringify(resultados),
		selecciones: JSON.stringify(selecciones),
		predicciones: JSON.stringify(predicciones)
	};
};

const prediccion = async ({ request }) => {
	const data = await request.formData();

	await supabase.from('predicciones').insert({
		usuario: data.get('usuario'),
		partido: data.get('partido'),
		resultado_local: data.get('resultado_local'),
		resultado_visita: data.get('resultado_visita'),
		ganador: data.get('ganador'),
		ganador_penales: data.get('ganador_penales')
	});
};

export const actions = {
	prediccion
};
