import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../../app.state';
import { selectUsersInStore, selectUsersPageLoading, selectUsersShowInitWaitingMessage } from '../_selectors/user.selectors';

export class UsersDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectUsersPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectUsersShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectUsersInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
