import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({locals,params}) {
    console.log(params.id)
    const answer = await locals.pb.collection('answer').getFullList({
        filter:'paper = "'  + params.id +'"',
        expand:'paper'
    })
    return {answer}
};