import {Injectable} from '@angular/core';
import {catchError, exhaustMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {userCreate, usersActionToggleLoading, usersPageToggleLoading} from '../_actions/user.actions';
import {authMessage} from '../_actions/auth.actions';
import {UserService} from '../_services/user.service';

@Injectable()
export class UserEffects {

	constructor(private actions$: Actions,
				private userService: UserService) {
	}

	userCreate = createEffect(() => this.actions$.pipe(
		ofType(userCreate),
		exhaustMap(action => {
			console.log(action);
			return this.userService.createUser(action.userData).pipe(
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			);
		})
	), {dispatch: false});

	/* @Effect()
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

	/* @Effect()
	updateUser$ = this.actions$.pipe(
		ofType(userUpdate),
		mergeMap(({ user }) => {
			this.store.dispatch(this.showActionLoadingDispatcher);
			return this.auth.updateUser(user);
		}),
		map(() => this.hideActionLoadingDispatcher),
		catchError((error) => of(userError(error)))
	); */
}
