import { createSelector } from '@ngrx/store';
import { each, find, some } from 'lodash';
import { selectAllRoles } from './role.selectors';
import { selectAllPermissions } from './permission.selectors';
import { Role } from '../_interfaces/role.interface';
import { Permission } from '../_interfaces/permission.interface';

export const selectAuthState = state =>  state.auth;

export const isLoggedIn = createSelector(
	selectAuthState,
	auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
	isLoggedIn,
	loggedIn => !loggedIn
);

export const isUserLoaded = createSelector(
	selectAuthState,
	auth => auth.isUserLoaded
);

export const currentUser = createSelector(
	selectAuthState,
	auth => auth.user
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
	(userRoleIds: string[], allRoles: Role[]) => {
		return getPermissionsIdsFrom(userRoleIds, allRoles);
	}
);

/* export const checkHasUserPermission = (permissionId: string) => createSelector(
	currentUserPermissionsIds,
	(ids: string[]) => {
		return ids.some(id => id === permissionId);
	}
); */

export const currentUserPermissions = createSelector(
	currentUserPermissionsIds,
	selectAllPermissions,
	(permissionIds: string[], allPermissions: Permission[]) => {
		const result: Permission[] = [];
		each(permissionIds, id => {
			const userPermission = find(allPermissions, elem => elem.id === id);
			if (userPermission) {
				result.push(userPermission);
			}
		});
		return result;
	}
);

function getPermissionsIdsFrom(userRolesIds: string[] = [], allRoles: Role[] = []): string[] {
	const userRoles: Role[] = [];
	each(userRolesIds, (_id: string) => {
		const userRole = find(allRoles, (_role: Role) => _role.id === _id);
		if (userRole) {
			userRoles.push(userRole);
		}
	});

	const result: string[] = [];
	each(userRoles, (_role: Role) => {
		each(_role.permissions, id => {
			if (!some(result, _id => _id === id)) {
				result.push(id);
			}
		});
	});
	return result;
}
