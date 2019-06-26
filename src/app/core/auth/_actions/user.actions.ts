import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { QueryParamsModel } from '../../_base/crud';
import { IUser } from '../_interfaces/user.interface';

export enum UserActionTypes {
	AllUsersRequested        = '[IUsers Module] All IUsers Requested',
	AllUsersLoaded           = '[IUsers API] All IUsers Loaded',
	UserOnServerCreated      = '[Edit IUser Component] IUser On Server Created',
	UserCreated              = '[Edit IUser Dialog] IUser Created',
	UserUpdated              = '[Edit IUser Dialog] IUser Updated',
	UserDeleted              = '[IUsers List Page] IUser Deleted',
	UsersPageRequested       = '[IUsers List Page] IUsers Page Requested',
	UsersPageLoaded          = '[IUsers API] IUsers Page Loaded',
	UsersPageCancelled       = '[IUsers API] IUsers Page Cancelled',
	UsersPageToggleLoading   = '[IUsers] IUsers Page Toggle Loading',
	UsersActionToggleLoading = '[IUsers] IUsers Action Toggle Loading'
}

export class UserOnServerCreated implements Action {
	readonly type = UserActionTypes.UserOnServerCreated;

	constructor(public payload: { user: IUser }) {
	}
}

export class UserCreated implements Action {
	readonly type = UserActionTypes.UserCreated;

	constructor(public payload: { user: IUser }) {
	}
}


export class UserUpdated implements Action {
	readonly type = UserActionTypes.UserUpdated;

	constructor(public payload: {
		partialUser: Update<IUser>,
		user: IUser
	}) {
	}
}

export class UserDeleted implements Action {
	readonly type = UserActionTypes.UserDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class UsersPageRequested implements Action {
	readonly type = UserActionTypes.UsersPageRequested;

	constructor(public payload: { page: QueryParamsModel }) {
	}
}

export class UsersPageLoaded implements Action {
	readonly type = UserActionTypes.UsersPageLoaded;

	constructor(public payload: { users: IUser[], totalCount: number, page: QueryParamsModel }) {
	}
}


export class UsersPageCancelled implements Action {
	readonly type = UserActionTypes.UsersPageCancelled;
}

export class UsersPageToggleLoading implements Action {
	readonly type = UserActionTypes.UsersPageToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export class UsersActionToggleLoading implements Action {
	readonly type = UserActionTypes.UsersActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}

export type UserActions = UserCreated
	| UserUpdated
	| UserDeleted
	| UserOnServerCreated
	| UsersPageLoaded
	| UsersPageCancelled
	| UsersPageToggleLoading
	| UsersPageRequested
	| UsersActionToggleLoading;
