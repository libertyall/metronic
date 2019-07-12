import {Action, createReducer, on} from '@ngrx/store';
import {QueryParamsModel} from '../../_base/crud';
import {
	getAllUsers,
	getAllUsersSuccess,
	getUser,
	getUsersPage,
	getUsersPageError,
	getUsersPageSuccess,
	getUserSuccess,
	userCreate,
	userCreateSuccess,
	userDelete,
	userError,
	usersActionToggleLoading,
	usersPageToggleLoading,
	userSuccess,
	userUpdate
} from '../_actions/user.actions';

export interface UserState {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedUserId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
	entities: [];
}

export const initialState: UserState = {
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: undefined,
	lastCreatedUserId: undefined,
	showInitWaitingMessage: true,
	entities: []
};

export const reducer = createReducer(
	initialState,

	on(usersPageToggleLoading, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(usersActionToggleLoading, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userError, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userSuccess, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userCreate, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userCreateSuccess, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userUpdate, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(userDelete, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getUser, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getUserSuccess, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getAllUsers, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getAllUsersSuccess, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getUsersPage, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getUsersPageError, (state, action) => {
		console.log(action.type);
		return {...state};
	}),

	on(getUsersPageSuccess, (state, action) => {
		console.log(action.type);
		return {...state};
	})
);

export function usersReducer(state: UserState | undefined, action: Action): UserState {
	return reducer(state, action);
}
