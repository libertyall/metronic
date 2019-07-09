import {select, Store} from '@ngrx/store';
import {BaseDataSource} from '../../_base/crud';
import {AppState} from '../../reducers';
import {
	selectApplicationPageLoading,
	selectApplicationShowInitWaitingMessage,
	selectCurrentApplication
} from '../selectors/application.selectors';

export class ApplicationsDataSource extends BaseDataSource {

	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectApplicationPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectApplicationShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectCurrentApplication)
		).subscribe((app) => {
			console.log(app);
			// this.entitySubject.next(app);
		});
	}

}
