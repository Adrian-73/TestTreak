import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	// @ts-ignore
	if(!locals.user){
        redirect(301,'/')
	}
	const getGroups = async () => {
		try {
            let groups = structuredClone(await locals.pb.collection('group').getFullList({
				fields: "id,grpname,Admin,expand",
                filter: '(Admin = "' + locals.user.id + '"' + ' || Co_Admins ?~ "' + locals.user.id + '" || Members ?~ "' + locals.user.id + '")',
				expand: 'Admin,paper_via_grp'
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
};
