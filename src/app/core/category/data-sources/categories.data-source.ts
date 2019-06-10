import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../reducers';
import {
	selectCategoriesInStore, selectCategoriesPageLoading, selectCategoriesShowInitWaitingMessage
} from '../selectors/category.selectors';


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
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}

}
