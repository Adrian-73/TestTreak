/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    default : async ({ request}) => {
        const formData = await request.formData();
        console.log('formData: ', formData);
    },
	createGroup: async ({ request, locals }) => {
		let data = await request.formData();
		const groupAvatar = data.get('avatar');

		if (groupAvatar.size === 0) {
			data.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb.collection('groups').create(data);

			locals.group.name = name;
			locals.group.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);

			throw error(400, 'Something went wrong creating your group');
		}

		return {
			success: true
		};
	}
};