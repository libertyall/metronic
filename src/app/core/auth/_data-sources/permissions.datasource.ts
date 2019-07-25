import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../../store/app.state';
import {
	selectQueryResult, selectPermissionsPageLoading, selectPermissionsShowInitWaitingMessage
} from '../_selectors/permission.selectors';

export class PermissionsDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectPermissionsPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectPermissionsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectQueryResult)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});

	}
}
