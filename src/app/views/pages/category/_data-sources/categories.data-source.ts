import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../../../core/_base/crud';
import { AppState } from '../../../../core/reducers';
import {
	selectCategoriesInStore, selectCategoriesPageLoading, selectCategoriesShowInitWaitingMessage
} from '../_selectors/category.selectors';


export class CategoriesDataSource extends BaseDataSource {

	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectCategoriesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectCategoriesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectCategoriesInStore)
		).subscribe((response: QueryResultsModel) => {
			console.log(response);
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}

}
