import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { authReducer } from '../auth/_reducers/auth.reducers';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
	router;
	auth;
}

export const reducers: ActionReducerMap<AppState> = { router: routerReducer, auth: authReducer};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
