import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {usersReducer} from '../auth/_reducers/user.reducers';
import {authReducer, AuthState} from '../auth/_reducers/auth.reducers';
import {LoggerState} from '../../modules/logger/logger.state';
import {loggerReducer} from '../../modules/logger/logger.reducers';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../environments/environment';

export interface AppState {
	auth: AuthState;
	logger: LoggerState;
	// router: RouterReducerState;
	// users;
}

export const appReducer: ActionReducerMap<AppState, any> = {
	auth: authReducer,
	logger: loggerReducer,
	// router: routerReducer,
	// users: usersReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
