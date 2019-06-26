import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { Role } from '../_interfaces/role.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { QueryParamsModel } from '../../_base/crud';
import { map, take } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {

	private userPath = `users`;
	private rolesPath = `roles`;
	private permissionsPath = `permissions`;

	users$: Observable<IUser[]>;
	roles$: Observable<Role[]>;
	permissions$: Observable<any>;

	private userCollectionRef: AngularFirestoreCollection<IUser>;
	private roleCollectionRef: AngularFirestoreCollection<Role>;
	private permissionCollectionRef: AngularFirestoreCollection<any>;

	constructor(public afAuth: AngularFireAuth,
				private store: Store<AppState>,
				private afs: AngularFirestore) {

		this.userCollectionRef = this.afs.collection<IUser>(this.userPath);
		this.users$ = this.userCollectionRef.valueChanges();

		this.roleCollectionRef = this.afs.collection<Role>(this.rolesPath);
		this.roles$ = this.roleCollectionRef.valueChanges();

		this.permissionCollectionRef = this.afs.collection<Role>(this.permissionsPath);
		this.permissions$ = this.permissionCollectionRef.valueChanges();
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

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	async register(values: IUser): Promise<any> {
		const registerAction = await this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
		const sendVerificationMail = await this.sendVerificationMail();
		const updateUser = this.saveUser(values);
		return Promise.all([registerAction, sendVerificationMail, updateUser]);
	}

	sendVerificationMail(): Promise<void> {
		return this.afAuth.auth.currentUser.sendEmailVerification();
	}

	getUserById(userId: string): Observable<IUser> {
		return this.afs.doc<IUser>(this.userPath + '/' + userId).valueChanges();
	}

	public requestPassword(email: string): Promise<void> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	saveUser(data: IUser): Observable<void> {
		data.id = this.afAuth.auth.currentUser.uid;
		delete data.password;
		const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`/users/${ data.id }`);
		return from(userRef.set(data, { merge: true }));
	}

	removeUser(userId: string): Promise<any> {
		return this.afs.collection<IUser>(this.userPath).doc(userId).delete();
	}

	/*
	 Roles
	 */
	getAllRoles(): Observable<Role[]> {
		return this.roles$.pipe(
			take(1)
		);
	}

	getRoleList(page?: QueryParamsModel): Observable<any> {
		const { filter, pageNumber, pageSize, sortField, sortOrder } = page;
		return this.roles$.pipe(
			take(1),
			map((roles: Role[]) => {
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

	searchRoleByTitle(filter, roles: Role[]) {
		return filter && filter.title ? roles.filter(role => {
			return role.title.indexOf(filter.title.toLowerCase()) > -1;
		}) : roles;
	}

	createRole(role: Role): Observable<Role> {
		// role.id = this.afs.createId();
		return from(this.afs.collection<Role>(this.rolesPath).doc(role.id).set(role).then(() => role));
	}

	removeRole(roleId: string): Promise<any> {
		return this.afs.collection<IUser>(this.rolesPath).doc(roleId).delete();
	}

	updateRole(role: Role): Promise<void> {
		return this.afs.collection<IUser>(this.rolesPath).doc(role.id).update(role);
	}

	/*
	 Permissions
	 */
	getPermissions() {
		return this.permissions$;
	}


	getCreationBy(): string {
		return 'asdasd';
		/* return this.afAuth.user.pipe(map(user => {
		 return user;
		 })); */
	}

	getCreationAt(): any {
		return firebase.firestore.FieldValue.serverTimestamp();
	}


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

	createUser(userData: IUser): Observable<IUser> {
		console.log('ToDo');
		console.log(userData);
		return of(userData);
	}

}
