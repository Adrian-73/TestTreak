import PocketBase from 'pocketbase';
// @ts-ignore
import { SerializeNonPOJOs } from '$lib/utils';

// @ts-ignore
export const load = ({ locals }) => {
	// @ts-ignore
	if (locals.user) {
		return {
			// @ts-ignore
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};

