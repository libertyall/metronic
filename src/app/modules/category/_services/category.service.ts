import {
	EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityOp, Logger,
	QueryParams
} from '@ngrx/data';
import { Category } from '../_model/category.model';
import { from, Observable, of, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSelectors } from '../../settings/_selectors/app.selectors';
import * as _ from 'lodash';
import { UpdateNum } from '@ngrx/entity/src/models';
import { Injectable } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { select } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class CategoryService extends EntityCollectionServiceBase<Category> {

	name: string;
	private path = 'categories';

	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory,
				private appSelectors: AppSelectors,
				logger: Logger,
				private afs: AngularFirestore) {
		super('Category', serviceElementsFactory);
		console.log(this.name);
	}

	setLoading(isLoading: boolean): void {
		this.loading$ = of(isLoading);
	}

	getAll(options?: EntityActionOptions): Observable<Category[]> {
		return this.afs.collection<Category>(this.path).valueChanges().pipe(
			tap(() => EntityOp.SET_LOADING), //  super.setLoading(false)),
			map(categories => categories),
			tap(() => EntityOp.SET_LOADED));
	}

	getWithQuery(queryParams: QueryParams | string, options?: EntityActionOptions): Observable<Category[]> {
		const params = _.merge({
			direction: 'desc',
			active: 'parentCategoryId',
			pageIndex: 0,
			pageSize: 100
		}, queryParams);
		console.log(params);
		return this.afs.collection<Category>(this.path, ref =>
			ref.orderBy(params.direction, <OrderByDirection>params.direction)
				.startAfter(Number(params.pageIndex))
				.limit(Number(params.pageSize)))
			.valueChanges();
		/*
		 .where('isStaticPage', '==', false)
		 .where('displayInFooter', '==', false)
		 .where('publicationStatus', '==', 1)
		 */
	}

	getByKey(key: any, options?: EntityActionOptions): Observable<Category> {
		return this.afs.collection<Category>(this.path).doc<Category>(key).valueChanges().pipe(catchError(e => throwError(e)));
	}

	add(entity: Category): Observable<Category> {
		console.log('adding');
		return of({
			title: '123'
		});
	}

	update(update: any | UpdateNum<Category>): Observable<Category> {
		return of();
	}

	delete(entity: any, options?: EntityActionOptions): Observable<number | string> {
		return from(this.afs.collection(this.path).doc(entity).delete()).pipe(
			map(() => entity)
		);
	}

	upsert(entity: Category): Observable<Category> {
		return of();
	}

}
