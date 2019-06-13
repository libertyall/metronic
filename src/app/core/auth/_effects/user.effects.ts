import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '../../reducers';
import {
    UserActionTypes,
    UsersPageRequested,
    UsersPageLoaded,
    UserCreated,
    UserDeleted,
    UserUpdated,
    UserOnServerCreated,
    UsersActionToggleLoading,
    UsersPageToggleLoading
} from '../_actions/user.actions';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserEffects {
    showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });

	constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) { }

    @Effect()
    loadUsersPage$ = this.actions$
        .pipe(
            /* ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.auth.getUsers(payload.page);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
            }),
            map(response => {
                const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new UsersPageLoaded({
                    users: result.items,
                    totalCount: result.totalCount,
                    page: lastQuery
                });
            }) */
        );

    @Effect()
    deleteUser$ = this.actions$
        .pipe(
            ofType<UserDeleted>(UserActionTypes.UserDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.auth.removeUser(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateUser$ = this.actions$
        .pipe(
            ofType<UserUpdated>(UserActionTypes.UserUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                console.log('updateUser');
                return this.auth.saveUser(payload.user);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    /* @Effect()
    createUser$ = this.actions$
        .pipe(
            ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.createUser(payload.user).pipe(
                    tap(res => {
                        this.store.dispatch(new UserCreated({ user: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        ); */
}
