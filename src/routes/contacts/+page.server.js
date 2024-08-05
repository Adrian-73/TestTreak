import { Container } from 'postcss';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals}) => {
	// @ts-ignore

    if (locals.user) {
        const contacts = structuredClone(await locals.pb.collection('users').getOne(locals.user.id,{ field:'expand',expand:'contacts'}));
        ;
		return {
			user: locals.user,
            contacts: contacts.expand.contacts
		};
	}
	redirect(302, '/login');
};