import { createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserActions, UserActionTypes } from '../_actions/user.actions';
import { QueryParamsModel } from '../../_base/crud';
import { IUser } from '../_interfaces/user.interface';

// tslint:disable-next-line:no-empty-interface
export interface UsersState extends EntityState<IUser> {
	listLoading: boolean;
	actionsLoading: boolean;
	totalCount: number;
	lastCreatedUserId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialUsersState: UsersState = adapter.getInitialState({
	listLoading: false,
	actionsLoading: false,
	totalCount: 0,
	lastQuery: new QueryParamsModel({}),
	lastCreatedUserId: undefined,
	showInitWaitingMessage: true
});

export function usersReducer(state = initialUsersState, action: UserActions): UsersState {
	switch (action.type) {
		case UserActionTypes.UsersPageToggleLoading:
			return {
				...state, listLoading: action.payload.isLoading, lastCreatedUserId: undefined
			};
		case UserActionTypes.UsersActionToggleLoading:
			return {
				...state, actionsLoading: action.payload.isLoading
			};
		case UserActionTypes.UserOnServerCreated:
			return {
				...state
			};
		case UserActionTypes.UserCreated:
			return adapter.addOne(action.payload.user, {
				...state, lastCreatedUserId: action.payload.user.id
			});
		case UserActionTypes.UserUpdated:
			return adapter.updateOne(action.payload.partialUser, state);
		case UserActionTypes.UserDeleted:
			return adapter.removeOne(action.payload.id, state);
		case UserActionTypes.UsersPageCancelled:
			return {
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
		default:
			return state;
	}
}

export const getUserState = createFeatureSelector<UsersState>('users');

export const {
	selectAll,
	selectEntities,
	selectIds,
	selectTotal
} = adapter.getSelectors();
