import {Injectable} from '@angular/core';
import {
	EntityActionOptions,
	EntityCollectionServiceBase,
	EntityCollectionServiceElementsFactory,
	Logger,
	QueryParams
} from '@ngrx/data';
import {Category} from "../_model/category.model";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {shareReplay, tap} from "rxjs/operators";
import {AppSelectors} from '../../settings/_selectors/app.selectors';
import OrderByDirection = firebase.firestore.OrderByDirection;
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class CategoryService extends EntityCollectionServiceBase<Category> {

	private path = 'categories';

	// filterObserver: FilterObserver;
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory,
				private appSelectors: AppSelectors,
				logger: Logger,
				private afs: AngularFirestore) {
		super('Category', serviceElementsFactory);
		logger.log('Created custom Category EntityDataService');
		/* this.filterObserver = {
			filter$: this.filter$,
			setFilter: this.setFilter.bind(this)
		};*/
	}

	getAllOnDataSourceChange = this.appSelectors.dataSource$.pipe(tap(_ => this.getAll()), shareReplay(1));

	getAll(options?: EntityActionOptions): Observable<Category[]> {
		return this.afs.collection<Category>(this.path).valueChanges();
	}

	getWithQuery(queryParams: QueryParams | string, options?: EntityActionOptions): Observable<Category[]> {
		const params = _.merge(queryParams,
			{
				direction: 'asc',
				active: 'title',
				pageIndex: 0,
				pageSize: 10
			});
		console.log(params);
		return this.afs.collection<Category>(this.path, ref =>
			ref.orderBy(params.direction, <OrderByDirection>params.direction)
				.startAfter(params.pageIndex)
				.limit(params.pageSize))
			.valueChanges();
		/*
		.where('isStaticPage', '==', false)
				.where('displayInFooter', '==', false)
				.where('publicationStatus', '==', 1)
		 */
	}

}
