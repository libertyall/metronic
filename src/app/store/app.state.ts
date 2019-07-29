import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from '../core/auth/_reducers/auth.reducers';
import { LoggerState } from '../modules/logger/logger.state';
import { loggerReducer } from '../modules/logger/logger.reducers';
import { environment } from '../../environments/environment';
import { IRouterStateUrl } from '../shared/utils/utils';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { uploadReducer, UploadState } from '../shared/modules/upload/_reducers/upload.reducer';
import { settingsReducer, SettingsState } from '../modules/settings/_reducers/settings.reducers';
import { sessionReducer, SessionState } from '../modules/settings/_reducers/session.reducer';

export function logger(reducer: any) {
	return (state: any, action: any) => {
		return reducer(state, action);
	};
}

export interface IAppState {
	// application: IEntityState<ApplicationModel>;
	// category: IEntityState<Category>;
	auth: AuthState;
	logger: LoggerState;
	router: RouterReducerState<IRouterStateUrl>;
	session: SessionState;
	settings: SettingsState;
	uploader: UploadState;
	// users: UserState;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
	// application: applicationReducer,
	auth: authReducer,
	logger: loggerReducer,
	router: routerReducer,
	session: sessionReducer,
	settings: settingsReducer,
	uploader: uploadReducer
	// users: usersReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = environment.production ? [] : []; // storeFreeze
