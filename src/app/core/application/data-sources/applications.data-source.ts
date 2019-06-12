import { select, Store } from '@ngrx/store';
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
import { AppState } from '../../reducers';
import {
	selectApplicationsInStore, selectApplicationsPageLoading, selectApplicationsShowInitWaitingMessage
} from '../selectors/application.selectors';


export class ApplicationsDataSource extends BaseDataSource {

	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectApplicationsPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectApplicationsShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectApplicationsInStore)
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}

}
