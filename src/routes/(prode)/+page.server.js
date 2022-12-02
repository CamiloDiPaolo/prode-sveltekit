import supabase from '$lib/server/db/connection.js';

export async function load() {
	const { data } = await supabase.from('equipos').select('*');
	return {
		equipos: JSON.stringify(data)
	};
}
