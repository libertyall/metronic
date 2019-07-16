import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, Logger, QueryParams} from '@ngrx/data';

import {from, Observable} from 'rxjs';
import {Category} from './model/category.model';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryDataService extends EntityCollectionServiceBase<Category> {

	private collection = this.afs.collection<Category>('categories');

	constructor(private elementsFactory: EntityCollectionServiceElementsFactory,
				private afs: AngularFirestore,
				private logger: Logger) {
		super('Category', elementsFactory);
		// logger.log('Created custom Category EntityDataService');
	}

	add(entity: Category): Observable<Category> {
		return from(this.collection.add(entity)).pipe(
			mergeMap((doc: DocumentReference) => this.getById(doc.id))
		);
	}

	/* delete(key: number | string): Observable<number | string> {
		return from(this.collection.doc('' + key).delete())
			.pipe(
				map(() => key)
			);
	} */

	getAll(): Observable<Category[]> {
		// console.log(this.collection);
		return this.collection.valueChanges();
	}

	getById(key: number | string): Observable<Category> {
		return this.collection.doc<Category>('' + key).valueChanges();
	}

	getWithQuery(queryParams: QueryParams | string): Observable<Category[]> {
		return null;
	}

	/* update(update: Update<Category>): Observable<Category> {
		const id = String(update.id);
		const updateDoc = this.collection.doc(id);

		return from(
			updateDoc.update(update.changes)
		).pipe(mergeMap(() => <Observable<Category>>updateDoc.valueChanges()));
	} */

	upsert(entity: Category): Observable<Category> {
		return null;
	}

}
