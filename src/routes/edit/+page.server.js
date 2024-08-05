import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    if(locals.user){
        redirect(300,"/home")
    }else(
        redirect(301,'/')
    )
}