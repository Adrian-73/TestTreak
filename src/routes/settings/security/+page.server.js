import { error, redirect } from '@sveltejs/kit';

export const actions = {
	// @ts-ignore
	updatePassword: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
	// @ts-ignore
			await locals.pb.collection('users').update(locals.user.id, data);
	// @ts-ignore
			locals.pb.authStore.clear();
		} catch {
			// @ts-ignore
			console.log('Error: ', err);
			// @ts-ignore
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};