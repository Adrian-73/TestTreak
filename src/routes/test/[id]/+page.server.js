import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (!locals.user) return { status: 403 };
    const attempt = await locals.pb.collection('answer').getFullList({
        fields: ``,
        filter: `attendee = "${locals.user.id}" && paper = "${params.id}"`,
    });
    const paper = await locals.pb.collection('paper').getOne(params.id, {
        fields: `id,name,start_time,end_time,max_attempts,expand.grp,grp,

        expand.mcq_via_paper.id,expand.mcq_via_paper.qno,expand.mcq_via_paper.question,expand.mcq_via_paper.options,expand.mcq_via_paper.number,expand.mcq_via_paper.neg_number,

        expand.short_answer_via_paper.id,expand.short_answer_via_paper.qno,expand.short_answer_via_paper.question,expand.short_answer_via_paper.number,

        expand.msq_via_paper.id,expand.msq_via_paper.qno,expand.msq_via_paper.question,expand.msq_via_paper.options,expand.msq_via_paper.number,

        expand.nat_via_paper.id,expand.nat_via_paper.qno,expand.nat_via_paper.question,expand.nat_via_paper.number`,
        expand: 'mcq_via_paper,short_answer_via_paper,msq_via_paper,nat_via_paper,grp'
    });
    if (paper.end_time > Date.now() || attempt.length >= paper.max_attempts
    ) redirect(302, '/group/' + paper.grp);

    return paper;
};
export const actions = {
    default: async function submit({ locals, request, url }) {
        const formData = Object.fromEntries(await request.formData());
        const paper_id = url.pathname.split('/')[2];
        const attempt = await locals.pb.collection('answer').getFullList({
            fields: ``,
            filter: `attendee = "${locals.user.id}" && paper = "${paper_id}"`,
        });
        const paper = await locals.pb.collection('paper').getOne(paper_id,
            { expand: 'mcq_via_paper,short_answer_via_paper,msq_via_paper,nat_via_paper,grp' }
        );
        if (attempt.length >= paper.max_attempts) redirect(302, '/group/' + paper.grp);
        let score = 0;
        let evaluted = {};
        for (const key in formData) {
            // if(key.includes("msq-")){
            //     formData[key] = formData[key].split(",");
            // }
            if (key.includes("mcq-")) {
                formData[key] = formData[key] ? parseInt(formData[key]) : formData[key];
            }
            if (key.includes("nat-")) {
                formData[key] = formData[key] ? parseFloat(formData[key]) : formData[key];
            }
        }

        if (paper.autocheck) {
            paper.expand.mcq_via_paper.forEach((mcq) => {

                if (formData[`mcq-${mcq.id}`] == "") {
                    console.log(formData[`mcq-${mcq.id}`])
                    evaluted[`mcq-${mcq.id}`] = 0;
                } else if (formData[`mcq-${mcq.id}`] === mcq.answer) {
                    score += mcq.number;
                    evaluted[`mcq-${mcq.id}`] = mcq.number;
                } else {
                    score -= mcq.neg_number;
                    evaluted[`mcq-${mcq.id}`] = -mcq.neg_number;
                }
            });
            let pairs = {};
            paper.expand.short_answer_via_paper.forEach((short_answer) => {
                pairs[`short_answer-${short_answer.id}`] = {
                    "question": short_answer.question,
                    "key": short_answer.key,
                    "answer": formData[`short_answer-${short_answer.id}`]
                }
                evaluted[`short_answer-${short_answer.id}`] = short_answer.number;
            });
            const response = await fetch("http://0.0.0.0:8000/evaluate_paper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "pairs": pairs })
            });
            const data = await response.json();
            console.log(data);
            for (const key in data) {
                evaluted[key] *= data[key];
                score += evaluted[key];
            }
            paper.expand.msq_via_paper.forEach((msq) => {
                console.log(typeof (formData[`msq-${msq.id}`]))
                console.log(typeof (msq.answer))
                console.log(formData[`msq-${msq.id}`] === msq.answer)
                if (formData[`msq-${msq.id}`] === msq.answer) {
                    evaluted[`msq-${msq.id}`] = msq.number;
                    score += msq.number;
                } else {
                    evaluted[`msq-${msq.id}`] = 0;
                }
            });
            paper.expand.nat_via_paper.forEach((nat) => {

                if (formData[`nat-${nat.id}`] === nat.key) {
                    evaluted[`nat-${nat.id}`] = nat.number;
                    score += nat.number;
                } else {
                    evaluted[`nat-${nat.id}`] = 0;
                }
            });

        }
        const answer = structuredClone(await locals.pb.collection('answer').create({
            "attendee": locals.user.id,
            "paper": paper_id,
            "attempt": attempt.length + 1,
            "score": score,
            "checked": paper.autocheck,
            "response": formData,
            "evaluted": evaluted,
        }));
        redirect(302, '/group/' + paper.grp);


    }
}