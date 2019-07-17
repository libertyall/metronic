import { createSelector } from '@ngrx/store';
import { each, find, some } from 'lodash';
import { selectAllRoles } from './role.selectors';
import { selectAllPermissions } from './permission.selectors';
import { RoleClass } from '../_interfaces/role.interface';
import { PermissionClass } from '../_interfaces/permission.interface';

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
	auth => {
		console.log(auth);
		return auth.user || null;
	}
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
	(userRoleIds: string[], allRoles: RoleClass[]) => {
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
	(permissionIds: string[], allPermissions: PermissionClass[]) => {
		const result: PermissionClass[] = [];
		each(permissionIds, id => {
			const userPermission = find(allPermissions, elem => elem.id === id);
			if (userPermission) {
				result.push(userPermission);
			}
		});
		return result;
	}
);

function getPermissionsIdsFrom(userRolesIds: string[] = [], allRoles: RoleClass[] = []): string[] {
	const userRoles: RoleClass[] = [];
	each(userRolesIds, (_id: string) => {
		const userRole = find(allRoles, (_role: RoleClass) => _role.id === _id);
		if (userRole) {
			userRoles.push(userRole);
		}
	});

	const result: string[] = [];
	each(userRoles, (_role: RoleClass) => {
		each(_role.permissions, id => {
			if (!some(result, _id => _id === id)) {
				result.push(id);
			}
		});
	});
	return result;
}
