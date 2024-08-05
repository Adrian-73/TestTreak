import PocketBase from 'pocketbase';
// @ts-ignore
import { SerializeNonPOJOs } from '$lib/utils';


// @ts-ignore
export const handle = async ({ event, resolve }) => {// @ts-ignore
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');// @ts-ignore
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');// @ts-ignore

	if (event.locals.pb.authStore.isValid) {// @ts-ignore
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} else {// @ts-ignore
		event.locals.user = undefined;// @ts-ignore
	}

	const response = await resolve(event);
// @ts-ignore
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};