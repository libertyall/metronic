import { Injectable } from '@angular/core';
import { UserInterface } from '../_interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable, of, Subscription } from 'rxjs';
import { RoleInterface } from '../_interfaces/role.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { QueryParamsModel } from '../../_base/crud';
import { map, take } from 'rxjs/operators';
import { PermissionInterface } from '../_interfaces/permission.interface';
import { getAuthUser, setLoggedOut } from '../_actions/auth.actions';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {

	private userPath = `users`;
	private rolesPath = `roles`;
	private permissionsPath = `permissions`;

	users$: Observable<UserInterface[]>;
	roles$: Observable<RoleInterface[]>;
	permissions$: Observable<any>;

	private userCollectionRef: AngularFirestoreCollection<UserInterface>;
	private roleCollectionRef: AngularFirestoreCollection<RoleInterface>;
	private permissionCollectionRef: AngularFirestoreCollection<any>;

	private userSubscription: Subscription = new Subscription();

	constructor(public afAuth: AngularFireAuth,
				private store: Store<AppState>,
				private afs: AngularFirestore) {

		this.userCollectionRef = this.afs.collection<UserInterface>(this.userPath);
		this.users$ = this.userCollectionRef.valueChanges();

		this.roleCollectionRef = this.afs.collection<RoleInterface>(this.rolesPath);
		this.roles$ = this.roleCollectionRef.valueChanges();

		this.permissionCollectionRef = this.afs.collection<RoleInterface>(this.permissionsPath);
		this.permissions$ = this.permissionCollectionRef.valueChanges();


		this.afAuth.authState.subscribe((user: firebase.User) => {
			if (user) {
				this.userSubscription = this.afs.doc(`/users/${ user.uid }`).valueChanges().subscribe((userObj: any) => {
					this.store.dispatch(getAuthUser(userObj));
				});
			} else {
				this.store.dispatch(setLoggedOut());
				this.userSubscription.unsubscribe();
			}
		});


	}

	getAuthState() {
		return this.afAuth.authState;
	}

	getCurrentUser() {
		return this.afAuth.auth.currentUser;
	}

	doLoginWithCredentials(credentials: { email: string, password: string, rememberMe?: boolean }): Promise<UserCredential> {
		if (credentials.rememberMe) {
			return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
				return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
				/* if (signInAction.user) {
				 console.log(signInAction.user);
				 await this.updateUser(signInAction.user);
				 }
				 return signInAction; */
			});
		} else {
			return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
				return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
				/* if (signInAction.user) {
				 console.log(signInAction.user);
				 await this.updateUser(signInAction.user);
				 }
				 return signInAction; */
			});
		}
	}

	logout(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	async register(values: UserInterface): Promise<any> {
		const registerAction = await this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
		const sendVerificationMail = await this.sendVerificationMail();
		const updateUser = this.saveUser(values);
		return Promise.all([registerAction, sendVerificationMail, updateUser]);
	}

	sendVerificationMail(): Promise<void> {
		return this.afAuth.auth.currentUser.sendEmailVerification();
	}

	getUserById(userId: string): Observable<UserInterface> {
		return this.afs.doc<UserInterface>(this.userPath + '/' + userId).valueChanges();
	}

	public requestPassword(email: string): Promise<void> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	saveUser(data: UserInterface): Observable<void> {
		data.id = this.afAuth.auth.currentUser.uid;
		delete data.password;
		const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`/users/${ data.id }`);
		return from(userRef.set(data, { merge: true }));
	}

	deleteUser(user: UserInterface): Promise<any> {
		return this.afs.collection<UserInterface>(this.userPath).doc(user.id).delete();
	}

	createUser(userData: UserInterface): Observable<UserInterface> {
		console.log('ToDo');
		console.log(userData);
		return of(userData);
	}

	updateUser(user: UserInterface): Promise<void> {
		return this.afs.collection<UserInterface>(this.userPath).doc(user.id).set(user, { merge: true });
	}

	getAllUsers(): Observable<UserInterface[]> {
		return this.users$.pipe(take(1));
	}

	getUserList(page?: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.users$.pipe(
			take(1),
			map((users: UserInterface[]) => {
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

	private searchUser(filter, users): UserInterface[] {
		return users;
	}

	/*
	 Roles
	 */
	getAllRoles(): Observable<RoleInterface[]> {
		return this.roles$.pipe(take(1));
	}

	getRoleList(page?: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.roles$.pipe(
			take(1),
			map((roles: RoleInterface[]) => {
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

	sortData(items, sortField = 'title', sortOrder = 'asc') {
		return items.sort((a, b) => {
			return (a[sortField] < b[sortField] ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
		});
	}

	searchRoleByTitle(filter, roles: RoleInterface[]) {
		return filter && filter.title ? roles.filter(role => {
			return role.title.indexOf(filter.title.toLowerCase()) > -1;
		}) : roles;
	}

	createRole(role: RoleInterface): Observable<RoleInterface> {
		// role.id = this.afs.createId();
		return from(this.afs.collection<RoleInterface>(this.rolesPath).doc(role.id).set(role).then(() => role));
	}

	deleteRole(roleId: string): Promise<any> {
		return this.afs.collection<UserInterface>(this.rolesPath).doc(roleId).delete();
	}

	updateRole(role: RoleInterface): Promise<void> {
		return this.afs.collection<UserInterface>(this.rolesPath).doc(role.id).update(role);
	}

	/*
	 Permissions
	 */
	getAllPermissions() {
		return this.permissions$.pipe(take(1));
	}

	getPermissionList(page?: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.permissions$.pipe(
			take(1),
			map((permissions: PermissionInterface[]) => {
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

	searchPermissionByTitle(filter, permissions: PermissionInterface[]) {
		return filter && filter.title ? permissions.filter(permission => {
			return permission.title.indexOf(filter.title.toLowerCase()) > -1;
		}) : permissions;
	}

	createPermission(permission: PermissionInterface): Observable<PermissionInterface> {
		permission.id = this.afs.createId();
		return from(this.afs.collection<PermissionInterface>(this.permissionsPath).doc(permission.id).set(permission).then(() => permission));
	}

	deletePermission(permissionId: string): Promise<any> {
		return this.afs.collection<UserInterface>(this.permissionsPath).doc(permissionId).delete();
	}

	updatePermission(permission: PermissionInterface): Promise<void> {
		return this.afs.collection<UserInterface>(this.permissionsPath).doc(permission.id).update(permission);
	}


	/**
	 * Other Functions
	 */
	getCreationBy(): string {
		return 'asdasd';
		/* return this.afAuth.user.pipe(map(user => {
		 return user;
		 })); */
	}

	getCreationAt(): any {
		return firebase.firestore.FieldValue.serverTimestamp();
	}

	/*
	 Social Login
	 */
	doFacebookLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.signInWithPopup(provider);
	}

	doTwitterLogin(): Observable<UserCredential> {
		console.log(123);
		const provider = new firebase.auth.TwitterAuthProvider();
		return from(this.afAuth.auth.signInWithPopup(provider));
	}

	doGoogleLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		return this.afAuth.auth.signInWithPopup(provider);
	}

}
