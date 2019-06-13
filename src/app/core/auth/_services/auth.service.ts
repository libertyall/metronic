import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { Role } from '../_interfaces/role.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthService {

	private userPath = `users`;
	private rolesPath = `user-roles`;
	private permissionsPath = `user-permissions`;

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
		/* const myUser: IUser = {
			id: data.uid,
			emailVerified: data.emailVerified,
			photoURL: data.photoURL,
			phoneNumber: data.phoneNumber,
			providerData: data.providerData,
			assignedRoles: data.assignedRoles,
			creationTime: data.creationTime,
			...{
				email: data.email,
				lastSignInTime: firebase.firestore.FieldValue.serverTimestamp()
			}
		}; */
		const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${ data.uid }`);
		return from(userRef.set(data, { merge: true }));
	}

	// Roles
	getRoles(): Observable<Role[]> {
		return this.roles$;
	}

	removeUser(userId: string): Promise<any> {
		return this.afs.collection<IUser>(this.userPath).doc(userId).delete();
	}

	removeRole(roleId: string): Promise<any> {
		return this.afs.collection<IUser>(this.rolesPath).doc(roleId).delete();
	}

	updateRole(role: Role): Promise<void> {
		return this.afs.collection<IUser>(this.rolesPath).doc(role.id).update(role);
	}

	async createRole(role: Role): Promise<Role> {
		role.id = this.afs.createId();
		await this.afs.collection<Role>(this.rolesPath).doc(role.id).set(role);
		return role;
	}

	// Permissions/**/
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

	doTwitterLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.TwitterAuthProvider();
		return this.afAuth.auth.signInWithPopup(provider);
	}

	doGoogleLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		return this.afAuth.auth.signInWithPopup(provider);
	}

}
