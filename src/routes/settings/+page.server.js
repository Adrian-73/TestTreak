import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	// @ts-ignore
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	} else {
		throw redirect(303, '/settings/profile');
	}
};