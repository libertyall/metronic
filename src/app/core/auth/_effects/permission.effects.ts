import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {defer, forkJoin, Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {
	AllPermissionsLoaded,
	AllPermissionsRequested,
	PermissionActionTypes,
	PermissionCreated,
	PermissionCreateError,
	PermissionDeleted,
	PermissionOnServerCreated,
	PermissionsActionToggleLoading,
	PermissionsPageLoaded,
	PermissionsPageRequested,
	PermissionsPageToggleLoading,
	PermissionUpdated
} from '../_actions/permission.actions';
import {AppState} from '../../reducers';
import {QueryParamsModel, QueryResultsModel} from '../../_base/crud';
import {UserService} from "../_services/user.service";

@Injectable()
export class PermissionEffects {

	showPageLoadingDispatcher = new PermissionsPageToggleLoading({isLoading: true});
	showActionLoadingDispatcher = new PermissionsActionToggleLoading({isLoading: true});
	hideActionLoadingDispatcher = new PermissionsActionToggleLoading({isLoading: false});


	constructor(private actions$: Actions,
				private userService: UserService,
				private store: Store<AppState>) {
	}

	@Effect()
	loadAllPermissions$ = this.actions$
		.pipe(
			ofType<AllPermissionsRequested>(PermissionActionTypes.AllPermissionsRequested),
			mergeMap(() => this.userService.getAllPermissions()),
			map(permissions => new AllPermissionsLoaded({permissions}))
		);

	@Effect()
	loadPermissionsPage$ = this.actions$
		.pipe(
			ofType<PermissionsPageRequested>(PermissionActionTypes.PermissionsPageRequested),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showPageLoadingDispatcher);
				const requestToServer = this.userService.getPermissionList(payload.page);
				const lastQuery = of(payload.page);
				return forkJoin([requestToServer, lastQuery]);
			}),
			map(response => {
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				return new PermissionsPageLoaded({
					permissions: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			})
		);

	@Effect()
	deletePermission$ = this.actions$
		.pipe(
			ofType<PermissionDeleted>(PermissionActionTypes.PermissionDeleted),
			mergeMap(({payload}) => {
					this.store.dispatch(this.showActionLoadingDispatcher);
					return this.userService.deletePermission(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);

	@Effect()
	updatePermission$ = this.actions$
		.pipe(
			ofType<PermissionUpdated>(PermissionActionTypes.PermissionUpdated),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showActionLoadingDispatcher);
				return this.userService.updatePermission(payload.permission);
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			})
		);


	@Effect()
	createPermission$ = this.actions$
		.pipe(
			ofType<PermissionOnServerCreated>(PermissionActionTypes.PermissionOnServerCreated),
			switchMap(({payload}) => {
				console.log(123);
				console.log(payload.permission);
				return this.userService.createPermission(payload.permission).pipe(
					map(() => {
							console.log('test');
							return this.store.dispatch(new PermissionCreated({permission: payload.permission}));
						}
					));
			}),
			map(() => {
				return this.hideActionLoadingDispatcher;
			}),
			catchError((error) => {
				this.store.dispatch(new PermissionsActionToggleLoading({isLoading: false}));
				return of(new PermissionCreateError(error));
			})
		);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of(new AllPermissionsRequested());
	});
}
