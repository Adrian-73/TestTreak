/** @type {import('./$types').PageServerLoad} */

import { redirect } from '@sveltejs/kit';

export async function load({locals,url}) {
    if (!locals.user) redirect(303,'/');
    const grp = url.searchParams.get('grp');
    const group = grp?structuredClone(await locals.pb.collection('group').getOne(grp)):null;
    if (group && !group.Admin.includes(locals.user.id) && !group.Co_Admins.includes(locals.user.id)
    ) redirect(302, '/group/' + group.id);
    const allgroup = structuredClone(await locals.pb.collection('group').getFullList({
        fields: "id,grpname",
        filter: '(Admin = "' + locals.user.id + '"' + ' || Co_Admins ?~ "' + locals.user.id + '")'
    }));
    return {group:group,
        user: locals.user,
        allgroup: allgroup?allgroup:[],
    };
};
export const actions = {
    default : async function submit({locals, request}) {
        const formData = JSON.parse(Object.fromEntries(await request.formData()).data);

        console.log({locals, formData});
        const paper = structuredClone(await locals.pb.collection('paper').create({
            "name": formData.name,
            "start_time": formData.startTime,
            "end_time": formData.endTime,
            "grp": formData.group,
            "max_attempts": 1}
        ));
        for (const key in formData.question) {
            console.log({key, value: formData.question[key]});
            if(formData.question[key].content.type === "MCQ"){
                await locals.pb.collection('mcq').create({
                    "qno": formData.question[key].id,
                    "question": formData.question[key].content.question,
                    "options": formData.question[key].content.options,
                    "paper": paper.id,
                    "answer": formData.question[key].content.correct_option,
                    "number": formData.question[key].content.number,
                    "neg_number": formData.question[key].content.neg_number,
                });
            }else 
            if(formData.question[key].content.type === "SA"){
                await locals.pb.collection('short_answer').create({
                    "qno": formData.question[key].id,
                    "question": formData.question[key].content.question,
                    "key": formData.question[key].content.key,
                    "number": formData.question[key].content.number,
                    "paper": paper.id,
                });
            }else
            if(formData.question[key].content.type === "MSQ"){
                await locals.pb.collection('msq').create({
                    "qno": formData.question[key].id,
                    "question": formData.question[key].content.question,
                    "options": formData.question[key].content.options,
                    "paper": paper.id,
                    "number": formData.question[key].content.number,
                    "answer": formData.question[key].content.correct_option.join(","),
                });
            }else 
            if(formData.question[key].content.type === "NAT"){
                await locals.pb.collection('nat').create({
                    "qno": formData.question[key].id,
                    "question": formData.question[key].content.question,
                    "key": formData.question[key].content.key,
                    "number": formData.question[key].content.number,
                    "paper": paper.id,
                });
            }

        }redirect(302, '/');
    }
}
    