import { error, redirect } from '@sveltejs/kit';
// @ts-ignore
export const actions = {
	// @ts-ignore
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {// @ts-ignore
			await locals.pb.collection('users').authWithPassword(body.email, body.password);// @ts-ignore
			if (!locals.pb?.authStore?.model?.verified) {// @ts-ignore
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}// @ts-ignore
        console.log(locals.user);
        
		throw redirect(303, '/home');
	}
};