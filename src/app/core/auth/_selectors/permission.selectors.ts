import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsState } from '../_reducers/permission.reducers';
import * as fromPermissions from '../_reducers/permission.reducers';
import { HttpExtenstionsModel, QueryResultsModel } from '../../_base/crud';
import { each } from 'lodash';
import { PermissionInterface } from '../_interfaces/permission.interface';

export const selectPermissionsState = createFeatureSelector<PermissionsState>('permissions');

export const selectPermissionById = (permissionId: number) => createSelector(
    selectPermissionsState,
    ps => ps.entities[permissionId]
);

export const selectAllPermissions = createSelector(
    selectPermissionsState,
    fromPermissions.selectAll
);

export const selectAllPermissionsIds = createSelector(
    selectPermissionsState,
    fromPermissions.selectIds
);

export const allPermissionsLoaded = createSelector(
    selectPermissionsState,
    ps  => ps.isAllPermissionsLoaded
);

export const selectLastCreatedPermissionId = createSelector(
	selectPermissionsState,
	ps => ps.lastCreatedPermissionId
);

export const selectPermissionsPageLoading = createSelector(
	selectPermissionsState,
	permissionsState => permissionsState.listLoading
);

export const selectPermissionsShowInitWaitingMessage = createSelector(
	selectPermissionsState,
	rolesState => rolesState.showInitWaitingMessage
);

export const selectQueryResult = createSelector(
	selectPermissionsState,
	permissionsState => {
		const items: PermissionInterface[] = [];
		each(permissionsState.entities, element => {
			items.push(element);
		});
		const httpExtension = new HttpExtenstionsModel();
		httpExtension.sortArray(items, permissionsState.lastQuery.sortField, permissionsState.lastQuery.sortOrder);

		return new QueryResultsModel(permissionsState.queryResult, permissionsState.queryRowsCount);
	}
);
