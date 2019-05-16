import {Injectable} from '@angular/core';
import {IUser} from '../_interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from 'firebase';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {Role} from '../_interfaces/role.interface';
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";

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

	constructor(private afAuth: AngularFireAuth,
				private store: Store<AppState>,
				private afs: AngularFirestore) {

		this.userCollectionRef = this.afs.collection<IUser>(this.userPath);
		this.users$ = this.userCollectionRef.valueChanges();

		this.roleCollectionRef = this.afs.collection<Role>(this.rolesPath);
		this.roles$ = this.roleCollectionRef.valueChanges();

		this.permissionCollectionRef = this.afs.collection<Role>(this.permissionsPath);
		this.permissions$ = this.permissionCollectionRef.valueChanges();
	}

	async login(email: string, password: string): Promise<User> {
		const signInAction = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
		if (signInAction.user) {
			const myUser: IUser = {
				id: signInAction.user.uid,
				emailVerified: signInAction.user.emailVerified,
				...{
					email: email,
					password: password,
					lastSignInTime: firebase.firestore.FieldValue.serverTimestamp()
				}
			};
			await this.updateUser(myUser);
		}
		return signInAction.user;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	async register(values: IUser): Promise<any> {
		// const registrationData = await this.applicationService.getAppData().toPromise();
		const registerAction = await this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
		const sendVerificationMail = await this.sendVerificationMail();
		const updateUser = this.updateUser({
			id: registerAction.user.uid,
			emailVerified: registerAction.user.emailVerified,
			email: registerAction.user.email,
			creationAt: registerAction.user.metadata.creationTime,
			lastSignInTime: registerAction.user.metadata.lastSignInTime,
			assignedRoles: [] // ToDO: Set Default Role
		});
		return Promise.all([registerAction, sendVerificationMail, updateUser]);
	}

	sendVerificationMail(): Promise<void> {
		return this.afAuth.auth.currentUser.sendEmailVerification();
	}

	getUserById(userId: string): Observable<IUser> {
		return this.afs.doc<IUser>(this.userPath + '/' + userId).valueChanges();
	}

	getUsers(): Observable<IUser[]> {
		return this.users$;
	}

	public requestPassword(email: string): Promise<void> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	updateUser(data: IUser): Promise<void> {
		const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${data.id}`);
		return userRef.set(data, {merge: true});
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

	getCreationBy(): Observable<User> {
		return this.afAuth.user.pipe(map(user => {
			return user;
		}));
	}

	getCreationAt(): any {
		return firebase.firestore.FieldValue.serverTimestamp();
	}
}
