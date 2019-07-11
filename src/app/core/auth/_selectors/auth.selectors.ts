import { createSelector } from '@ngrx/store';
import { each, find, some } from 'lodash';
import { selectAllRoles } from './role.selectors';
import { selectAllPermissions } from './permission.selectors';
import { RoleInterface } from '../_interfaces/role.interface';
import { PermissionInterface } from '../_interfaces/permission.interface';

export const selectAuthState = state => {
	return state.auth;
};

export const selectAuthMessage = createSelector(
	selectAuthState,
	state => state.message
);

export const isLoggedIn = createSelector(
	selectAuthState,
	auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
	isLoggedIn,
	loggedIn => !loggedIn
);

export const isLoading = createSelector(
	selectAuthState,
	auth => auth.isLoading
);

export const currentUser = createSelector(
	selectAuthState,
	auth => auth.user || null
);

export const currentUserRoleIds = createSelector(
	currentUser,
	user => {
		if (!user) {
			return [];
		}
		return user.roles;
	}
);

export const currentUserPermissionsIds = createSelector(
	currentUserRoleIds,
	selectAllRoles,
	(userRoleIds: string[], allRoles: RoleInterface[]) => {
		const result = getPermissionsIdsFrom(userRoleIds, allRoles);
		return result;
	}
);

export const checkHasUserPermission = (permissionId: string) => createSelector(
	currentUserPermissionsIds,
	(ids: string[]) => {
		return ids.some(id => id === permissionId);
	}
);

export const currentUserPermissions = createSelector(
	currentUserPermissionsIds,
	selectAllPermissions,
	(permissionIds: string[], allPermissions: PermissionInterface[]) => {
		const result: PermissionInterface[] = [];
		each(permissionIds, id => {
			const userPermission = find(allPermissions, elem => elem.id === id);
			if (userPermission) {
				result.push(userPermission);
			}
		});
		return result;
	}
);

function getPermissionsIdsFrom(userRolesIds: string[] = [], allRoles: RoleInterface[] = []): string[] {
	const userRoles: RoleInterface[] = [];
	each(userRolesIds, (_id: string) => {
		const userRole = find(allRoles, (_role: RoleInterface) => _role.id === _id);
		if (userRole) {
			userRoles.push(userRole);
		}
	});

	const result: string[] = [];
	each(userRoles, (_role: RoleInterface) => {
		each(_role.permissions, id => {
			if (!some(result, _id => _id === id)) {
				result.push(id);
			}
		});
	});
	return result;
}
