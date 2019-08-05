import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.appkey);

const index = client.initIndex('categories_index');

export const indexCategory
	= functions
	.region('europe-west1')
	.firestore.document('categories/{categoryId}').onCreate((snap, context) => {

	const data = snap.data();
	const objectId = snap.id;

	return index.addObject({
		objectId,
		...data
	});
});

export const unIndexCategory
	= functions
	.region('europe-west1')
	.firestore.document('categories/{categoryId}').onDelete((snap, context) => {

	const objectId = snap.id;
	return index.deleteObject(objectId);
});
;
