import { Action, createReducer, on } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';
import {
	getAllUsers, getAllUsersSuccess, getUsersPage, getUsersPageError, getUsersPageSuccess, userCreate, userDelete,
	userError, usersActionToggleLoading, usersPageToggleLoading, userSuccess, userUpdate, userCreateSuccess, getUserSuccess, getUser
} from '../_actions/user.actions';

export interface State {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedUserId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
	entities: [];
}

export const initialState: State = {
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: undefined,
	lastCreatedUserId: undefined,
	showInitWaitingMessage: true,
	entities: []
};

export const usersReducer = createReducer(
	initialState,

	on(usersPageToggleLoading, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(usersActionToggleLoading, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userError, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userSuccess, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userCreate, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userCreateSuccess, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userUpdate, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(userDelete, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getUser, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getUserSuccess, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getAllUsers, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getAllUsersSuccess, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getUsersPage, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getUsersPageError, (state, action) => {
		console.log(action.type);
		return { ...state };
	}),

	on(getUsersPageSuccess, (state, action) => {
		console.log(action.type);
		return { ...state };
	})
);

export function reducer(state: State | undefined, action: Action): State {
	return usersReducer(state, action);
}

/*
 export function usersReducer(state = initialUsersState, action: UserActions): UsersState {
 switch  (action.type) {
 case UserActionTypes.UsersPageToggleLoading: return {
 ...state, listLoading: action.payload.isLoading, lastCreatedUserId: undefined
 };
 case UserActionTypes.UsersActionToggleLoading: return {
 ...state, actionsLoading: action.payload.isLoading
 };
 case UserActionTypes.UserOnServerCreated: return {
 ...state
 };
 case UserActionTypes.UserCreated: return adapter.addOne(action.payload.user, {
 ...state, lastCreatedUserId: action.payload.user.id
 });
 case UserActionTypes.UserUpdated: return adapter.updateOne(action.payload.partialUser, state);
 case UserActionTypes.UserDeleted: return adapter.removeOne(action.payload.id, state);
 case UserActionTypes.UsersPageCancelled: return {
 ...state, listLoading: false, lastQuery: new QueryParamsModel({})
 };
 case UserActionTypes.UsersPageLoaded: {
 return adapter.addMany(action.payload.users, {
 ...initialUsersState,
 totalCount: action.payload.totalCount,
 lastQuery: action.payload.page,
 listLoading: false,
 showInitWaitingMessage: false
 });
 }
 default: return state;
 }
 }

 export const getUserState = createFeatureSelector<UsersState>('users');

 export const {
 selectAll,
 selectEntities,
 selectIds,
 selectTotal
 } = adapter.getSelectors();*/
