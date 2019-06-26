import { Injectable } from '@angular/core';
import { defer, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import {
	AllRolesLoaded, AllRolesRequested, RoleActionTypes, RoleCreated, RoleCreateError, RoleDeleted, RoleOnServerCreated,
	RolesActionToggleLoading, RolesPageLoaded, RolesPageRequested, RolesPageToggleLoading, RoleUpdated
} from '../_actions/role.actions';
import { AuthService } from '../_services/auth.service';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';

@Injectable()
export class RoleEffects {
	showPageLoadingDispatcher = new RolesPageToggleLoading({ isLoading: true });
	showActionLoadingDispatcher = new RolesActionToggleLoading({ isLoading: true });
	hideActionLoadingDispatcher = new RolesActionToggleLoading({ isLoading: false });


	constructor(private actions$: Actions,
				private authService: AuthService,
				private store: Store<AppState>) {
	}

	@Effect()
	loadAllRoles$ = this.actions$
		.pipe(
			ofType<AllRolesRequested>(RoleActionTypes.AllRolesRequested),
			mergeMap(() => this.authService.getAllRoles()),
			map(roles => new AllRolesLoaded({ roles: roles }))
		);

	@Effect()
	loadRolesPage$ = this.actions$
		.pipe(
			ofType<RolesPageRequested>(RoleActionTypes.RolesPageRequested),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showPageLoadingDispatcher);
				const requestToServer = this.authService.getRoleList(payload.page);
				const lastQuery = of(payload.page);
				return forkJoin(requestToServer, lastQuery);
			}),
			map(response => {
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				return new RolesPageLoaded({
					roles: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			})
		);

	@Effect()
	deleteRole$ = this.actions$
		.pipe(
			ofType<RoleDeleted>(RoleActionTypes.RoleDeleted),
			mergeMap(({ payload }) => {
					this.store.dispatch(this.showActionLoadingDispatcher);
					return this.authService.removeRole(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	updateRole$ = this.actions$
		.pipe(
			ofType<RoleUpdated>(RoleActionTypes.RoleUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.authService.updateRole(payload.role);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);


	@Effect()
	createRole$ = this.actions$
		.pipe(
			ofType<RoleOnServerCreated>(RoleActionTypes.RoleOnServerCreated),
			switchMap(({ payload }) => {
				return this.authService.createRole(payload.role).pipe(
					map(() => this.store.dispatch(new RoleCreated({ role: payload.role })))
				);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			}),
			catchError((error) => {
				this.store.dispatch(new RolesActionToggleLoading({ isLoading: false }));
				return of(new RoleCreateError(error));
			})
		);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of(new AllRolesRequested());
	});
}
