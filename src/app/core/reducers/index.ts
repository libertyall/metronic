import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
	router;
	auth;
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
