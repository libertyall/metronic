import { Injectable } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import {
	UserActionTypes, UserCreated, UserDeleted, UserOnServerCreated, UsersActionToggleLoading, UsersPageLoaded,
	UsersPageRequested, UsersPageToggleLoading, UserUpdated
} from '../_actions/user.actions';
import { AuthService } from '../_services/auth.service';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { forkJoin, of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';

@Injectable()
export class UserEffects {
	showPageLoadingDispatcher = new UsersPageToggleLoading({ isLoading: true });
	hidePageLoadingDispatcher = new UsersPageToggleLoading({ isLoading: false });

	showActionLoadingDispatcher = new UsersActionToggleLoading({ isLoading: true });
	hideActionLoadingDispatcher = new UsersActionToggleLoading({ isLoading: false });

	constructor(private actions$: Actions,
				private userService: UserService,
				private authService: AuthService,
				private store: Store<AppState>) {
	}

	@Effect()
	loadUsersPage$ = this.actions$
		.pipe(
			ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
			mergeMap((request: any) => {
				this.store.dispatch(this.showPageLoadingDispatcher);
				const requestToServer = this.userService.getUserList(request.payload.page);
				const lastQuery = of(request.payload.page);
				return forkJoin(requestToServer, lastQuery);
			}),
			map((response) => {
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				return new UsersPageLoaded({
					users: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			})
		);

	@Effect()
	deleteUser$ = this.actions$
		.pipe(
			ofType<UserDeleted>(UserActionTypes.UserDeleted),
			mergeMap(({ payload }) => {
					this.store.dispatch(this.showActionLoadingDispatcher);
					return this.authService.removeUser(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	updateUser$ = this.actions$
		.pipe(
			ofType<UserUpdated>(UserActionTypes.UserUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.authService.saveUser(payload.user);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	createUser$ = this.actions$
		.pipe(
			ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.authService.createUser(payload.user).pipe(
					map(res => this.store.dispatch(new UserCreated({ user: res })))
				);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);
}
