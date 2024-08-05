/** @type {import('./$types').RequestHandler} */
export async function load({locals,params}) {
    let answer = {};
    try{
        answer = await locals.pb.collection('answer').getOne(params.id)
    }catch(err){
        redirect(303,'/view')
    }
    if(answer.attendee != locals.user.id){
        redirect(303,'/view')
    }
    let paper = {}
    try{paper= await locals.pb.collection('paper').getOne(answer.paper,{
        expand :'mcq_via_paper,short_answer_via_paper,msq_via_paper,nat_via_paper,grp'
    })}
    catch(err){
        redirect(303,'/view')
    } 
    console.log (JSON.stringify({
        paper: paper,
        answer: answer,
    }))
    return{
        paper: paper,
        answer: answer,
    }
};