/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    let grps = await locals.pb.collection('group').getFullList(
        {
            fields: "id,grpname,expand",
            filter: '(Admin = "' + locals.user.id + '"' + ' || Co_Admins ?~ "' + locals.user.id + '" || Members ?~ "' + locals.user.id + '")',
			expand: 'paper_via_grp'
        }
    )
    console.log(grps)
    return {grps};
    
};