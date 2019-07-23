import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {BaseDataSource, QueryResultsModel} from "../../../core/_base/crud";
import {
	selectSettingsInStore,
	selectSettingsPageLoading,
	selectSettingsShowInitWaitingMessage
} from "../_selectors/settings.selectors";
import {Application} from "../_model/application.model";

export class SettingsDatasource extends BaseDataSource {

	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(select(selectSettingsPageLoading));
		this.isPreloadTextViewed$ = this.store.pipe(select(selectSettingsShowInitWaitingMessage));

		this.store.pipe(
			select(selectSettingsInStore)
		).subscribe((response: Application) => {
			console.log(response);
			// this.paginatorTotalSubject.next(response.totalCount);
			// this.entitySubject.next(response.items);
		});
	}
}
