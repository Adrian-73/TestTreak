/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import { error } from 'console';
export const load = async ({ locals,params }) => {
	// @ts-ignore

    if (locals.user) {
        const group = structuredClone(await locals.pb.collection('group').getOne(params.id,{
            field:'id,grpname,expand',
            expand:'Admin,Co_Admins,Members,paper_via_grp'}));
        const chatMessages = structuredClone(await locals.pb.collection('grpchat').getList(1, 50, {
            sort: 'created',
            filter: `group = "${params.id}"`,
            expand: 'sender'
        }));       
        console.log({group}); 
		return {
			user: locals.user,
			group: group,
            chatMessages: chatMessages.items
		};
	}
	redirect(302, '/login');
};
export const actions = {
    sendMessage: async ({ locals, request, params }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        const userId = formData.get('userId');
        const groupId = params.id;

        if (!message) {
            return error(400, { error: 'Message is required' });
        }

        try {
            await locals.pb.collection('grpchat').create({
                message: message,
                sender: userId,
                group: groupId
            });
            return { success: true };
        } catch (err) {
            console.error('Failed to send message:', err);
            return error(500, { error: 'Failed to send message' });
        }
    }
};
