import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../reducers';
import {
	selectCategoryTypesInStore, selectCategoryTypesPageLoading, selectCategoryTypesShowInitWaitingMessage
} from '../_selectors/category-type.selectors';


export class CategoryTypesDataSource extends BaseDataSource {

	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectCategoryTypesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectCategoryTypesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectCategoryTypesInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}

}
