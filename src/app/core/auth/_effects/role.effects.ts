import {Injectable} from '@angular/core';
import {defer, forkJoin, Observable, of} from 'rxjs';
import {filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {QueryParamsModel, QueryResultsModel} from '../../_base/crud';
import { AppState } from '../../../app.state';
import {allRolesLoaded} from '../_selectors/role.selectors';
import {
	AllRolesLoaded,
	AllRolesRequested,
	RoleActionTypes,
	RoleCreated,
	RoleDeleted,
	RoleOnServerCreated,
	RolesActionToggleLoading,
	RolesPageLoaded,
	RolesPageRequested,
	RolesPageToggleLoading,
	RoleUpdated
} from '../_actions/role.actions';
import {UserService} from '../_services/user.service';

@Injectable()
export class RoleEffects {
	showPageLoadingDistpatcher = new RolesPageToggleLoading({isLoading: true});
	hidePageLoadingDistpatcher = new RolesPageToggleLoading({isLoading: false});

	showActionLoadingDistpatcher = new RolesActionToggleLoading({isLoading: true});
	hideActionLoadingDistpatcher = new RolesActionToggleLoading({isLoading: false});

	constructor(private actions$: Actions, private userService: UserService, private store: Store<AppState>) {
	}

	@Effect()
	loadAllRoles$ = this.actions$
		.pipe(
			ofType<AllRolesRequested>(RoleActionTypes.AllRolesRequested),
			withLatestFrom(this.store.pipe(select(allRolesLoaded))),
			filter(([action, isAllRolesLoaded]) => !isAllRolesLoaded),
			mergeMap(() => this.userService.getAllRoles()),
			map(roles => {
				return new AllRolesLoaded({roles});
			})
		);

	@Effect()
	loadRolesPage$ = this.actions$
		.pipe(
			ofType<RolesPageRequested>(RoleActionTypes.RolesPageRequested),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showPageLoadingDistpatcher);
				const requestToServer = this.userService.getRoleList(payload.page);
				const lastQuery = of(payload.page);
				return forkJoin([requestToServer, lastQuery]);
			}),
			map(response => {
				const result: QueryResultsModel = response[0];
				const lastQuery: QueryParamsModel = response[1];
				this.store.dispatch(this.hidePageLoadingDistpatcher);

				return new RolesPageLoaded({
					roles: result.items,
					totalCount: result.totalCount,
					page: lastQuery
				});
			}),
		);

	@Effect()
	deleteRole$ = this.actions$
		.pipe(
			ofType<RoleDeleted>(RoleActionTypes.RoleDeleted),
			mergeMap(({payload}) => {
					this.store.dispatch(this.showActionLoadingDistpatcher);
					return this.userService.deleteRole(payload.id);
				}
			),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);

	@Effect()
	updateRole$ = this.actions$
		.pipe(
			ofType<RoleUpdated>(RoleActionTypes.RoleUpdated),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.userService.updateRole(payload.role);
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);


	@Effect()
	createRole$ = this.actions$
		.pipe(
			ofType<RoleOnServerCreated>(RoleActionTypes.RoleOnServerCreated),
			mergeMap(({payload}) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.userService.createRole(payload.role).pipe(
					tap(res => {
						this.store.dispatch(new RoleCreated({role: res}));
					})
				);
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of(new AllRolesRequested());
	});
}
