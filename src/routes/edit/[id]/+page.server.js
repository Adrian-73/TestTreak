import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    if (!locals.user) redirect(303,'/');
    const papre_id = params.id;
    let paper;
    try{
        paper = structuredClone(await locals.pb.collection('paper').getOne(papre_id,{
            expand: 'mcq_via_paper,short_answer_via_paper,msq_via_paper,nat_via_paper,grp'
        }))
         
    }catch (err){
        redirect(303,'/')
    }
    if(paper.expand.grp.Admin == locals.user.id || (paper.expand.grp.Co_Admins).includes(locals.user.id)){
            return paper
        }else{redirect(303,'/')}
}