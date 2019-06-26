import { Action } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';
import { Role } from '../_interfaces/role.interface';

export enum RoleActionTypes {
	AllRolesRequested        = '[Roles Home Page] All Roles Requested',
	AllRolesLoaded           = '[Roles API] All Roles Loaded',
	RoleOnServerCreated      = '[Edit Role Dialog] Role On Server Created',
	RoleCreated              = '[Edit Roles Dialog] Roles Created',
	RoleCreateError          = '[Create Role Dialog] Role NOT created',
	RoleUpdated              = '[Edit Role Dialog] Role Updated',
	RoleDeleted              = '[Roles List Page] Role Deleted',
	RolesPageRequested       = '[Roles List Page] Roles Page Requested',
	RolesPageLoaded          = '[Roles API] Roles Page Loaded',
	RolesPageCancelled       = '[Roles API] Roles Page Cancelled',
	RolesPageToggleLoading   = '[Roles page] Roles Page Toggle Loading',
	RolesActionToggleLoading = '[Roles] Roles Action Toggle Loading'
}

export class RoleOnServerCreated implements Action {
	readonly type = RoleActionTypes.RoleOnServerCreated;

	constructor(public payload: { role: Role }) {
	}
}

export class RoleCreateError implements Action {
	readonly type = RoleActionTypes.RoleCreateError;

	constructor(public payload: { error: any }) {
	}
}

export class RoleCreated implements Action {
	readonly type = RoleActionTypes.RoleCreated;

	constructor(public payload: { role: Role }) {
	}
}

export class RoleUpdated implements Action {
	readonly type = RoleActionTypes.RoleUpdated;

	constructor(public payload: { role: Role }) {
	}
}

export class RoleDeleted implements Action {
	readonly type = RoleActionTypes.RoleDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class RolesPageRequested implements Action {
	readonly type = RoleActionTypes.RolesPageRequested;

	constructor(public payload: { page: QueryParamsModel }) {
	}
}

export class RolesPageLoaded implements Action {
	readonly type = RoleActionTypes.RolesPageLoaded;

	constructor(public payload: { roles: Role[], totalCount: number, page: QueryParamsModel }) {
	}
}

export class RolesPageCancelled implements Action {
	readonly type = RoleActionTypes.RolesPageCancelled;
}

export class AllRolesRequested implements Action {
	readonly type = RoleActionTypes.AllRolesRequested;

	constructor() {
	}
}

export class AllRolesLoaded implements Action {
	readonly type = RoleActionTypes.AllRolesLoaded;

	constructor(public payload: { roles: Role[] }) {
	}
}

export class RolesPageToggleLoading implements Action {
	readonly type = RoleActionTypes.RolesPageToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export class RolesActionToggleLoading implements Action {
	readonly type = RoleActionTypes.RolesActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export type RoleActions = RoleCreated
	| RoleCreateError
	| RoleUpdated
	| RoleDeleted
	| RolesPageRequested
	| RolesPageLoaded
	| RolesPageCancelled
	| AllRolesLoaded
	| AllRolesRequested
	| RoleOnServerCreated
	| RolesPageToggleLoading
	| RolesActionToggleLoading;
