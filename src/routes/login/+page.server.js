import { invalid, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY, NODE_ENV } from '$env/static/private';
import supabase from '$lib/server/db/connection.js';

const login = async ({ cookies, request }) => {
	const data = await request.formData();

	if (!data.get('username') || !data.get('password')) return invalid(400, { missing: true });

	// const user = await dbOpeartions.users.getOne({
	// 	username: data.get('username'),
	// 	password: data.get('password')
	// });
	console.log(data.get('username'), data.get('password'));

	const { data: user } = await supabase
		.from('usuarios')
		.select('*')
		.eq('username', data.get('username'))
		.eq('password', data.get('password'));

	console.log(user);

	if (!user) return invalid(400, { credentials: true });

	const privateKey = JWT_PRIVATE_KEY;
	const token = jwt.sign({ id: user[0].id }, privateKey, {
		expiresIn: '1h'
	});

	cookies.set('jwt', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

const logout = async ({ cookies }) => {
	cookies.delete('jwt');
	throw redirect(302, '/login');
};

export const actions = {
	login,
	logout
};
