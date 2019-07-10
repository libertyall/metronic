import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { PermissionActions, PermissionActionTypes } from '../_actions/permission.actions';
import { QueryParamsModel } from '../../_base/crud';
import { PermissionInterface } from '../_interfaces/permission.interface';

export interface PermissionsState extends EntityState<PermissionInterface> {
	isAllPermissionsLoaded: boolean;
	queryRowsCount: number;
	queryResult: PermissionInterface[];
	lastCreatedPermissionId: string;
	listLoading: boolean;
	actionsLoading: boolean;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<PermissionInterface> = createEntityAdapter<PermissionInterface>();

export const initialPermissionsState: PermissionsState = adapter.getInitialState({
	isAllPermissionsLoaded: false,
	queryRowsCount: 0,
	queryResult: [],
	lastCreatedPermissionId: undefined,
	listLoading: false,
	actionsLoading: false,
	lastQuery: new QueryParamsModel({}),
	showInitWaitingMessage: true
});

export function permissionsReducer(state = initialPermissionsState, action: PermissionActions): PermissionsState {
	switch (action.type) {
		case PermissionActionTypes.PermissionsPageToggleLoading:
			return {
				...state, listLoading: action.payload.isLoading, lastCreatedPermissionId: undefined
			};
		case PermissionActionTypes.PermissionsActionToggleLoading:
			return {
				...state, actionsLoading: action.payload.isLoading
			};
		case PermissionActionTypes.PermissionOnServerCreated:
			return {
				...state
			};
		case PermissionActionTypes.PermissionCreated:
			return adapter.addOne(action.payload.permission, {
				...state, lastCreatedPermissionId: action.payload.permission.id
			});
		// case PermissionActionTypes.PermissionUpdated: return adapter.updateOne(action.payload.permission, state);
		case PermissionActionTypes.PermissionDeleted:
			return adapter.removeOne(action.payload.id, state);
		case PermissionActionTypes.AllPermissionsLoaded: {
			return adapter.addAll(action.payload.permissions, {
				...state, isAllPermissionsLoaded: true
			});
		}
		case PermissionActionTypes.PermissionsPageCancelled:
			return {
				...state, listLoading: false, queryRowsCount: 0, queryResult: [], lastQuery: new QueryParamsModel({})
			};
		case PermissionActionTypes.PermissionsPageLoaded:
			return adapter.addMany(action.payload.permissions, {
				...initialPermissionsState,
				listLoading: false,
				queryRowsCount: action.payload.totalCount,
				queryResult: action.payload.permissions,
				lastQuery: action.payload.page,
				showInitWaitingMessage: false
			});
		default:
			return state;
	}
}

export const {
				 selectAll,
				 selectEntities,
				 selectIds,
				 selectTotal
			 } = adapter.getSelectors();

export const getPermissionState = createFeatureSelector<PermissionsState>('permissions');

