import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../reducers';
import {
	selectQueryResult, selectRolesPageLoading, selectRolesShowInitWaitingMessage
} from '../_selectors/role.selectors';

export class RolesDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectRolesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectRolesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectQueryResult)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});

	}
}
