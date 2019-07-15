import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QueryParamsModel } from '../../_base/crud';
import { RoleActions, RoleActionTypes } from '../_actions/role.actions';
import { RoleClass } from '../_interfaces/role.interface';
import { UserInterface } from '../_interfaces/user.interface';

export interface RolesState extends EntityState<RoleClass> {
    isAllRolesLoaded: boolean;
    queryRowsCount: number;
    queryResult: RoleClass[];
    lastCreatedRoleId: string;
    listLoading: boolean;
    actionsLoading: boolean;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<RoleClass> = createEntityAdapter<RoleClass>();

export const initialRolesState: RolesState = adapter.getInitialState({
    isAllRolesLoaded: false,
    queryRowsCount: 0,
    queryResult: [],
    lastCreatedRoleId: undefined,
    listLoading: false,
    actionsLoading: false,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function rolesReducer(state = initialRolesState, action: RoleActions): RolesState {
    switch  (action.type) {
        case RoleActionTypes.RolesPageToggleLoading: return {
                ...state, listLoading: action.payload.isLoading, lastCreatedRoleId: undefined
        };
        case RoleActionTypes.RolesActionToggleLoading: return {
            ...state, actionsLoading: action.payload.isLoading
        };
        case RoleActionTypes.RoleOnServerCreated: return {
            ...state
        };
        case RoleActionTypes.RoleCreated: return adapter.addOne(action.payload.role, {
            ...state, lastCreatedRoleId: action.payload.role.id
        });
        case RoleActionTypes.RoleUpdated: return adapter.updateOne(action.payload.partialrole, state);
        case RoleActionTypes.RoleDeleted: return adapter.removeOne(action.payload.id, state);
        case RoleActionTypes.AllRolesLoaded: return adapter.addAll(action.payload.roles, {
            ...state, isAllRolesLoaded: true
        });
        case RoleActionTypes.RolesPageCancelled: return {
            ...state, listLoading: false, queryRowsCount: 0, queryResult: [], lastQuery: new QueryParamsModel({})
        };
        case RoleActionTypes.RolesPageLoaded: return adapter.addMany(action.payload.roles, {
            ...initialRolesState,
            listLoading: false,
            queryRowsCount: action.payload.totalCount,
            queryResult: action.payload.roles,
            lastQuery: action.payload.page,
            showInitWaitingMessage: false
        });
        default: return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
