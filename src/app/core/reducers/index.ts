import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { categoryReducer } from '../category/reducers/category.reducers';
import { categoryTypeReducer } from '../category-types/_reducers/category-type.reducers';
import { usersReducer } from '../auth/_reducers/user.reducers';
// import { authReducer } from '../auth/_reducers/auth.reducer';
import {applicationReducer} from '../application/reducers/application.reducers';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
	router;
	// auth;
	currentApplication;
	categories;
	categoryTypes;
	users;
}

export const appReducer: ActionReducerMap<AppState, any> = {
	// auth: authReducer,
	currentApplication: applicationReducer,
	router: routerReducer,
	categories: categoryReducer,
	categoryTypes: categoryTypeReducer,
	users: usersReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
