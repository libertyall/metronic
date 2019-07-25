import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import {initialSessionState} from "../_reducers/session.reducer";
import {AppState} from "../../../store/app.state";


const getAppState = createFeatureSelector<AppState>('appConfig');
const getDataSource = createSelector(getAppState, (state: AppState) => (state ? state.session.dataSource : initialSessionState.dataSource));

@Injectable()
export class AppSelectors {
	constructor(private store: Store<AppState>) {}

	get dataSource$() {
		return this.store.select(getDataSource).pipe(distinctUntilChanged());
	}

}
