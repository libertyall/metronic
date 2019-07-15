import { Action } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';
import { UserInterface } from '../_interfaces/user.interface';
import { PermissionClass } from '../_interfaces/permission.interface';

export enum PermissionActionTypes {
	AllPermissionsRequested        = '[Init] All Permissions Requested',
	AllPermissionsLoaded           = '[Init] All Permissions Loaded',
	PermissionOnServerCreated      = '[Edit Permission Dialog] Permission On Server Created',
	PermissionCreated              = '[Edit Permissions Dialog] Permissions Created',
	PermissionCreateError          = '[Create Permission Dialog] Permission NOT created',
	PermissionUpdated              = '[Edit Permission Dialog] Permission Updated',
	PermissionDeleted              = '[Permissions List Page] Permission Deleted',
	PermissionsPageRequested       = '[Permissions List Page] Permissions Page Requested',
	PermissionsPageLoaded          = '[Permissions API] Permissions Page Loaded',
	PermissionsPageCancelled       = '[Permissions API] Permissions Page Cancelled',
	PermissionsPageToggleLoading   = '[Permissions page] Permissions Page Toggle Loading',
	PermissionsActionToggleLoading = '[Permissions] Permissions Action Toggle Loading'
}

export class PermissionOnServerCreated implements Action {
	readonly type = PermissionActionTypes.PermissionOnServerCreated;

	constructor(public payload: { permission: PermissionClass }) {
		console.log(payload);
	}
}

export class PermissionCreateError implements Action {
	readonly type = PermissionActionTypes.PermissionCreateError;

	constructor(public payload: { error: any }) {
	}
}

export class PermissionCreated implements Action {
	readonly type = PermissionActionTypes.PermissionCreated;

	constructor(public payload: { permission: PermissionClass }) {
	}
}

export class PermissionUpdated implements Action {
	readonly type = PermissionActionTypes.PermissionUpdated;

	constructor(public payload: { permission: PermissionClass }) {
	}
}

export class PermissionDeleted implements Action {
	readonly type = PermissionActionTypes.PermissionDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class PermissionsPageRequested implements Action {
	readonly type = PermissionActionTypes.PermissionsPageRequested;

	constructor(public payload: { page: QueryParamsModel }) {
	}
}

export class PermissionsPageLoaded implements Action {
	readonly type = PermissionActionTypes.PermissionsPageLoaded;

	constructor(public payload: { permissions: PermissionClass[], totalCount: number, page: QueryParamsModel }) {
	}
}

export class PermissionsPageCancelled implements Action {
	readonly type = PermissionActionTypes.PermissionsPageCancelled;
}

export class AllPermissionsRequested implements Action {
	readonly type = PermissionActionTypes.AllPermissionsRequested;

	constructor() {
	}
}

export class AllPermissionsLoaded implements Action {
	readonly type = PermissionActionTypes.AllPermissionsLoaded;

	constructor(public payload: { permissions: PermissionClass[] }) {
	}
}

export class PermissionsPageToggleLoading implements Action {
	readonly type = PermissionActionTypes.PermissionsPageToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export class PermissionsActionToggleLoading implements Action {
	readonly type = PermissionActionTypes.PermissionsActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export type PermissionActions = PermissionCreated
	| PermissionCreateError
	| PermissionUpdated
	| PermissionDeleted
	| PermissionsPageRequested
	| PermissionsPageLoaded
	| PermissionsPageCancelled
	| AllPermissionsLoaded
	| AllPermissionsRequested
	| PermissionOnServerCreated
	| PermissionsPageToggleLoading
	| PermissionsActionToggleLoading;

