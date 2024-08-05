/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import {SerializeNonPOJOs} from '$lib/utils';
// @ts-ignore grp = structuredClone(locals.pb.collection('group').getList(1,10,{}));
export const load = async ({ locals }) => {
	// @ts-ignore
	const getGroups = async () => {
		try {
            let groups = structuredClone(await locals.pb.collection('group').getFullList({
				fields: "id,grpname,Admin,Co_Admins,expand",
                filter: '(Admin = "' + locals.user.id + '"' + ' || Co_Admins ?~ "' + locals.user.id + '" || Members ?~ "' + locals.user.id + '")',
				expand: 'Admin'
            }));
            return groups;
        } catch (e) {
            console.log('error: ', e);
            return undefined;
        }

	};
	if (locals.user) {

		return {
			user: locals.user,
			groups: await getGroups()
		};
	}
	redirect(302, '/login');
};
