import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {IApplication} from '../../../shared/interfaces/application.interface';

export enum ApplicationActionTypes {
	ApplicationRequested = '[View Application Page] Get Current Application',
	ApplicationLoaded = '[Applications API] Application Loaded',
	ApplicationOnServerCreated = '[Edit Application Component] Application On Server Created',
	ApplicationCreated = '[Edit Application Dialog] Application Created',
	ApplicationUpdated = '[Edit Application Dialog] Application Updated',
	ApplicationDeleted = '[Applications List Page] Application Deleted',
	ApplicationsActionToggleLoading = '[Applications] Applications Action Toggle Loading'
}

export class ApplicationRequested implements Action {

	readonly type = ApplicationActionTypes.ApplicationRequested;

	constructor() {
	}
}

export class ApplicationLoaded implements Action {

	readonly type = ApplicationActionTypes.ApplicationLoaded;

	constructor(public payload: { application: IApplication }) {
	}
}


export class ApplicationOnServerCreated implements Action {
	readonly type = ApplicationActionTypes.ApplicationOnServerCreated;

	constructor(public payload: { application: IApplication }) {
	}
}

export class ApplicationCreated implements Action {
	readonly type = ApplicationActionTypes.ApplicationCreated;

	constructor(public payload: { application: IApplication }) {
	}
}


export class ApplicationUpdated implements Action {
	readonly type = ApplicationActionTypes.ApplicationUpdated;

	constructor(public payload: {
		partialApplication: Update<IApplication>,
		application: IApplication
	}) {
	}
}

export class ApplicationDeleted implements Action {
	readonly type = ApplicationActionTypes.ApplicationDeleted;

	constructor(public payload: { id: string }) {
	}
}

export class ApplicationsActionToggleLoading implements Action {
	readonly type = ApplicationActionTypes.ApplicationsActionToggleLoading;

	constructor(public payload: { isLoading: boolean }) {
	}
}


export type ApplicationActions =
	| ApplicationCreated
	| ApplicationUpdated
	| ApplicationDeleted
	| ApplicationOnServerCreated
	| ApplicationsActionToggleLoading
	| ApplicationRequested
	| ApplicationLoaded;
