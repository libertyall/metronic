import { Injectable } from '@angular/core';
import {
	AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable()
export class FirestoreEntityCollectionDataService<T> implements EntityCollectionDataService<T | DocumentChangeAction<T>> {

	constructor(private collection: AngularFirestoreCollection<T>, private afs: AngularFirestore) {
	}

	public get name() {
		console.log(this.collection.ref);
		return this.collection.ref.path;
	}

	add(entity: T): Observable<T> {
		entity['id'] = this.afs.createId();
		return from(this.afs.collection<T>(this.name).doc(entity['id']).set(entity)).pipe(mergeMap(() => this.getById(entity['id'])));
		// const entityWithId = Object.assign({id: this.afs.createId()}, entity);
		// return from(this.collection.doc(entityWithId.id).set(entityWithId)).pipe(mergeMap(() =>
		// this.getById(entityWithId.id)));
	}

	delete(key: number | string): Observable<number | string> {
		return from(this.collection.doc('' + key).delete()).pipe(map(() => key));
	}

	getAll(): Observable<DocumentChangeAction<T>[]> {
		console.log(this.name);
		this.afs.collection<T>(this.name).stateChanges().subscribe(t => console.log(t));
		return this.afs.collection<T>(this.name).stateChanges();
	}

	getById(key: string): Observable<T> {
		return this.collection.doc<T>(key).valueChanges();
	}

	getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
		return null;
	}

	update(update: Update<T>): Observable<T> {
		const id = String(update.id);
		const updateDoc = this.collection.doc(id);

		return from(
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

	constructor(protected firestore: AngularFirestore) {

	}

	create<T>(entityName: string): EntityCollectionDataService<T | DocumentChangeAction<T>> {
		console.log(entityName);
		return new FirestoreEntityCollectionDataService<T>(this.firestore.collection(entityName.toLowerCase()), this.firestore);
	}
}
