import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    if(locals.user){redirect(301,'/home')}
};