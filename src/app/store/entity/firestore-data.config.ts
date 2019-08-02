import {EntityBaseModel, FirestoreDataService} from "./firestore-data.service";

export function FirestoreDataConfig(config: { collectionName: string }) {
	return function <U extends EntityBaseModel, T extends new(...args: any[]) => FirestoreDataService<U>>(target: T): T {
		Object.defineProperties(
			target.prototype, {
				collection: {
					value: config.collectionName,
					writable: true
				},
				name: {
					value: `[${config.collectionName.toUpperCase()}] Firestore Data Service`,
					writable: true
				}
			}
		);
		return target;
		// return class CustomFirestoreDataService extends target {
		//     collection = config.collectionName;
		//     name = `[${config.collectionName}] Firestore Data Service`;
		// }
	};
}
