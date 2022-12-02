import { json } from '@sveltejs/kit';
import supabase from '$lib/server/db/connection';
import users from '$lib/old_data/users.json';

export async function GET({ url }) {
	const { data: equipos } = await supabase.from('equipos').select('*');

	await supabase.from('usuarios').insert(
		users.map((usuario) => {
			return {
				name: usuario.nombre,
				username: usuario.nombreUsuario,
				email: usuario.email,
				password: `${usuario.nombreUsuario}123456`,
				equipo: equipos.find((equipo) => equipo.acronimo == usuario.equipoDpma.acronimo).id
			};
		})
	);

	return json({
		status: 'ok'
	});
}
