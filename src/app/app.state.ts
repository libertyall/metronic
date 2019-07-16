import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './core/auth/_reducers/auth.reducers';
import { LoggerState } from './modules/logger/logger.state';
import { loggerReducer } from './modules/logger/logger.reducers';
import { autoEntityMetaReducer, IEntityState } from '@briebug/ngrx-auto-entity';
import { applicationReducer } from './modules/application/application.state';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { Category } from './modules/category/model/category.model';
import { ApplicationModel } from './modules/application/model/application.model';
import { categoryReducer } from './modules/category/category.state';
import { IRouterStateUrl } from './shared/utils/utils';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export function logger(reducer: any) {
	return (state: any, action: any) => {
		return reducer(state, action);
	};
}

export interface IAppState {
	// application: IEntityState<ApplicationModel>;
	category: IEntityState<Category>;
	auth: AuthState;
	logger: LoggerState;
	router: RouterReducerState<IRouterStateUrl>;
	// users: UserState;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
	// application: applicationReducer,
	category: categoryReducer,
	auth: authReducer,
	logger: loggerReducer,
	router: routerReducer,
	// users: usersReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
	? [autoEntityMetaReducer, storeFreeze]
	: [autoEntityMetaReducer];
