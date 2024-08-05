const { randomBytes } = await import('node:crypto');

export const SerializeNonPOJOs = (/** @type {any} */ obj) => {
	return structuredClone(obj);
};

export const generateUsername = (/** @type {string | any[]} */ name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (/** @type {any} */ collectionId, /** @type {any} */ recordId, /** @type {any} */ fileName, size = '0x0') => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};