import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import { UserInterface } from '../_interfaces/user.interface';
import { QueryParamsModel } from '../../_base/crud';
import { map, take } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import {PermissionClass} from '../_interfaces/permission.interface';
import {RoleClass} from '../_interfaces/role.interface';

@Injectable()
export class UserService {

	private userCollectionRef: AngularFirestoreCollection<UserInterface>;
	private roleCollectionRef: AngularFirestoreCollection<RoleClass>;
	private permissionCollectionRef: AngularFirestoreCollection<PermissionClass>;

	private userPath = `users`;
	private rolesPath = `roles`;
	private permissionsPath = `permissions`;

	users$: Observable<UserInterface[]>;
	roles$: Observable<RoleClass[]>;
	permissions$: Observable<PermissionClass[]>;

	constructor(private afs: AngularFirestore) {

		this.userCollectionRef = this.afs.collection<UserInterface>(this.userPath);
		this.users$ = this.userCollectionRef.valueChanges();

		this.roleCollectionRef = this.afs.collection<RoleClass>(this.rolesPath);
		this.roles$ = this.roleCollectionRef.valueChanges();

		this.permissionCollectionRef = this.afs.collection<PermissionClass>(this.permissionsPath);
		this.permissions$ = this.permissionCollectionRef.valueChanges();
	}

	createUser(userCredential: UserCredential): Observable<UserInterface> {
		const user: UserInterface = {
			providerId: userCredential.additionalUserInfo.providerId,
			email: userCredential.user.email,
			emailVerified: userCredential.user.emailVerified,
			displayName: userCredential.user.displayName,
			// firstName: localUser.firstName,
			// lastName: localUser.lastName,
			creationTime: userCredential.user.metadata.creationTime,
			lastSignInTime: userCredential.user.metadata.lastSignInTime,
			photoUrl: userCredential.user.photoURL,
			id: userCredential.user.uid,
			phoneNumber: userCredential.user.phoneNumber,
			assignedRoles: []
		};
		const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`/users/${ user.id }`);
		return from(userRef.set(user, { merge: true }).then(() => user));
	}

	getUserById(userId: string): Observable<UserInterface> {
		return this.afs.doc<UserInterface>(this.userPath + '/' + userId).valueChanges();
	}

	deleteUser(user: UserInterface): Observable<void> {
		return from(this.afs.collection<UserInterface>(this.userPath).doc(user.id).delete());
	}

	updateUser(userId: string, user: UserInterface): Observable<UserInterface> {
		return from(this.afs.collection<UserInterface>(this.userPath).doc(userId).update(user).then(() => user));
	}

	getAllUsers(): Observable<UserInterface[]> {
		return this.users$.pipe(take(1));
	}

	getUserList(page: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.users$.pipe(
			take(1),
			map(users => {
				const totalItems = users.length;
				const filteredItems = this.searchUser(filter, users);
				const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
				const paginatedItems = sortedItems.splice(pageNumber * pageSize, pageSize);
				return {
					items: paginatedItems,
					totalCount: totalItems,
					errorMessage: ''
				};
			})
		);
	}

	searchUser(filter, users) {
		return filter && (filter.lastName !== '' || filter.firstName !== '' || filter.email !== '' || filter.displayName !== '') ? users.filter(user => {
			return (user.displayName && user.displayName.indexOf(filter.displayName) > -1)
				|| (user.firstName && user.firstName.indexOf(filter.firstName) > -1)
				|| (user.lastName && user.lastName.indexOf(filter.lastName) > -1)
				|| (user.email && user.email.indexOf(filter.email) > -1);
		}) : users;
	}

	/*
	 Roles
	 */
	getAllRoles(): Observable<RoleClass[]> {
		return this.roles$.pipe(take(1));
	}

	getRoleList(page?: QueryParamsModel): Observable<any> {
		const {filter, pageNumber, pageSize, sortField, sortOrder} = page;
		return this.roles$.pipe(
			take(1),
			map((roles: RoleClass[]) => {
				const totalItems = roles.length;
				const filteredItems = this.searchRoleByTitle(filter, roles);
				const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
				const paginatedItems = sortedItems.splice(pageNumber * pageSize, pageSize);
				return {
					items: paginatedItems,
					totalCount: totalItems,
					errorMessage: ''
				};
			})
		);
	}

	createRole(role: RoleClass): Observable<RoleClass> {
		// role.id = this.afs.createId();
		return from(this.afs.collection<RoleClass>(this.rolesPath).doc(role.id).set(role).then(() => role));
	}

	deleteRole(roleId: string): Promise<any> {
		return this.afs.collection<UserInterface>(this.rolesPath).doc(roleId).delete();
	}

	updateRole(role: RoleClass): Promise<void> {
		return this.afs.collection<UserInterface>(this.rolesPath).doc(role.id).update(role);
	}

	searchRoleByTitle(filter, roles: RoleClass[]) {
		return filter && filter.title ? roles.filter(role => {
			return role.title.indexOf(filter.title.toLowerCase()) > -1;
		}) : roles;
	}

	/*
	 Permissions
	 */
	getAllPermissions() {
		return this.permissions$.pipe(take(1));
	}

	getPermissionList(page?: QueryParamsModel): Observable<any> {
		const {filter, pageNumber, pageSize, sortField, sortOrder} = page;
		return this.permissions$.pipe(
			take(1),
			map((permissions: PermissionClass[]) => {
				const totalItems = permissions.length;
				const filteredItems = this.searchPermissionByTitle(filter, permissions);
				const sortedItems = this.sortData(filteredItems, sortField, sortOrder);
				const paginatedItems = sortedItems.splice(pageNumber * pageSize, pageSize);
				return {
					items: paginatedItems,
					totalCount: totalItems,
					errorMessage: ''
				};
			})
		);
	}

	createPermission(permission: PermissionClass): Observable<PermissionClass> {
		permission.id = this.afs.createId();
		return from(this.afs.collection<PermissionClass>(this.permissionsPath).doc(permission.id).set(permission).then(() => permission));
	}

	deletePermission(permissionId: string): Promise<any> {
		return this.afs.collection<UserInterface>(this.permissionsPath).doc(permissionId).delete();
	}

	updatePermission(permission: PermissionClass): Promise<void> {
		return this.afs.collection<UserInterface>(this.permissionsPath).doc(permission.id).update(permission);
	}

	searchPermissionByTitle(filter, permissions: PermissionClass[]) {
		return filter && filter.title ? permissions.filter(permission => {
			return permission.title.indexOf(filter.title.toLowerCase()) > -1;
		}) : permissions;
	}

	sortData(items, sortField = 'title', sortOrder = 'asc') {
		return items.sort((a, b) => {
			return (a[sortField] < b[sortField] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
		});
	}
}
