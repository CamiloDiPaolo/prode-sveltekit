import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';
import supabase from '$lib/server/db/connection';

export const load = async ({ cookies }) => {
	let user;
	const token = cookies.get('jwt');
	const privateKey = JWT_PRIVATE_KEY;

	try {
		const decoded = jwt.verify(token, privateKey);
		console.log(decoded);

		const { data } = await supabase.from('usuarios').select('*').eq('id', decoded.id);
		console.log(data);
		user = data;
	} catch (err) {
		throw redirect(302, '/login');
	}

	return {
		user: JSON.stringify(user)
	};
};
