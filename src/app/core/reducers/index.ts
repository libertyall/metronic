import {ActionReducerMap} from '@ngrx/store';
import {usersReducer, UserState} from '../auth/_reducers/user.reducers';
import {authReducer, AuthState} from '../auth/_reducers/auth.reducers';
import {LoggerState} from '../../modules/logger/logger.state';
import {loggerReducer} from '../../modules/logger/logger.reducers';

export interface AppState {
	auth: AuthState;
	logger: LoggerState;
	// router: RouterReducerState;
	users: UserState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
	auth: authReducer,
	logger: loggerReducer,
	// router: routerReducer,
	users: usersReducer
};
