import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { AuthService } from '../_services';
import { AppState } from '../../reducers';
import {
	getUsersPage, getUsersPageError, getUsersPageSuccess, userCreate, userCreateSuccess, userDelete, userError,
	usersActionToggleLoading, usersPageToggleLoading, userUpdate
} from '../_actions/user.actions';

@Injectable()
export class UserEffects {
	showPageLoadingDispatcher = usersPageToggleLoading({ isLoading: true });
	hidePageLoadingDispatcher = usersPageToggleLoading({ isLoading: false });

	showActionLoadingDispatcher = usersActionToggleLoading({ isLoading: true });
	hideActionLoadingDispatcher = usersActionToggleLoading({ isLoading: false });

	@Effect()
	loadUsersPage$ = this.actions$.pipe(
		ofType(getUsersPage),
		mergeMap(({ page }) => {
			this.store.dispatch(this.showPageLoadingDispatcher);
			const requestToServer = this.auth.getUserList(page);
			const lastQuery = of(page);
			return forkJoin([requestToServer, lastQuery]);
		}),
		map(response => {
			const result: QueryResultsModel = response[0];
			const lastQuery: QueryParamsModel = response[1];
			return getUsersPageSuccess({
				users: result.items,
				totalCount: result.totalCount,
				page: lastQuery
			});
		}),
		catchError((error) => of(getUsersPageError(error)))
	);

	@Effect()
	deleteUser$ = this.actions$.pipe(
		ofType(userDelete),
		mergeMap(({ user }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.auth.deleteUser(user);
			}
		),
		map(() => this.hideActionLoadingDispatcher),
		catchError((error) => of(userError(error)))
	);

	@Effect()
	updateUser$ = this.actions$.pipe(
		ofType(userUpdate),
		mergeMap(({ user }) => {
			this.store.dispatch(this.showActionLoadingDispatcher);
			return this.auth.updateUser(user);
		}),
		map(() => this.hideActionLoadingDispatcher),
		catchError((error) => of(userError(error)))
	);

	@Effect()
	createUser$ = this.actions$.pipe(
		ofType(userCreate),
		mergeMap(({ user }) => {
			this.store.dispatch(this.showActionLoadingDispatcher);
			return this.auth.createUser(user);
		}),
		map(res => {
			this.store.dispatch(userCreateSuccess({ user: res }));
			return this.hideActionLoadingDispatcher;
		})
	);

	constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) {
	}
}
