import supabase from '$lib/server/db/connection';

export const load = async ({ parent }) => {
	const { data: posiciones } = await supabase.from('posiciones').select('*');
	const { data: usuarios } = await supabase.from('usuarios').select('*');

	return {
		posiciones: JSON.stringify(posiciones),
		usuarios: JSON.stringify(usuarios)
	};
};
