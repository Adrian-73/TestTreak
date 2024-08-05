import { error } from '@sveltejs/kit';

export const actions = {
	// @ts-ignore
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			// @ts-ignore
			await locals.pb.collection('users').requestEmailChange(data.email);
		} catch (err) {
			// @ts-ignore
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	// @ts-ignore
	updateUsername: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			// @ts-ignore
			await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
		} catch (err) {
			// @ts-ignore
			if (err.status === 404) {
				try {
					// @ts-ignore
					const { username } = await locals.pb
						.collection('users')
						// @ts-ignore
						.update(locals.user.id, { username: data.username });
					// @ts-ignore
					locals.user.username = username;
					return {
						success: true
					};
				} catch (err) {
					console.log('Error: ', err);
					// @ts-ignore
					throw error(err.status, err.message);
				}
			}
			console.log('Error: ', err);
			// @ts-ignore
			throw error(err.status, err.message);
		}
	}
};