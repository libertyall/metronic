import { Injectable } from '@angular/core';
import {
	AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference
} from '@angular/fire/firestore';
import { from as observableFrom, Observable } from 'rxjs';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { map, mergeMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable()
export class FirestoreEntityCollectionDataService<T> implements EntityCollectionDataService<T | DocumentChangeAction<T>> {

	constructor(private collection: AngularFirestoreCollection<T>, private afs: AngularFirestore) {
	}

	public get name() {
		return this.collection.ref.path;
	}

	add(entity: T): Observable<T> {
		entity['id'] = this.afs.createId();
		return observableFrom(this.collection.add(entity)).pipe(
			mergeMap((doc: DocumentReference) => this.getById(doc.id))
		);
	}

	delete(key: number | string): Observable<number | string> {
		return observableFrom(this.collection.doc('' + key).delete())
			.pipe(
				map(() => key)
			);
	}

	getAll(): Observable<DocumentChangeAction<T>[]> {
		return this.collection.stateChanges();
	}

	getById(key: number | string): Observable<T> {
		return this.collection.doc<T>('' + key).valueChanges();
	}

	getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
		return null;
	}

	update(update: Update<T>): Observable<T> {
		const id = String(update.id);
		const updateDoc = this.collection.doc(id);

		return observableFrom(
			updateDoc.update(update.changes)
		).pipe(mergeMap(() => <Observable<T>>updateDoc.valueChanges()));
	}

	upsert(entity: T): Observable<T> {
		return null;
	}
}

/**
 * Create a basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
@Injectable()
export class FirestoreDataServiceFactory {
	constructor(
		protected firestore: AngularFirestore
	) {

	}

	/**
	 * Create a default {EntityCollectionDataService} for the given entity type
	 * @param entityName Name of the entity type for this data service
	 */
	create<T>(entityName: string): EntityCollectionDataService<T | DocumentChangeAction<T>> {
		return new FirestoreEntityCollectionDataService<T>(this.firestore.collection(entityName.toLowerCase()), this.firestore);
	}
}
