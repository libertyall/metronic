import {Injectable} from '@angular/core';
import {UserInterface} from '../_interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {from, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {switchMap} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import { AppState } from '../../../app.state';

@Injectable()
export class AuthService {
	public authUser$: Observable<UserInterface>;

	constructor(public afAuth: AngularFireAuth,
				private store: Store<AppState>,
				private afs: AngularFirestore) {

		this.authUser$ = this.afAuth.authState.pipe(
			switchMap((user: firebase.User) => user ? this.afs.doc(`/users/${user.uid}`).valueChanges() : of(null))
		);
	}

	getAuthState() {
		return this.afAuth.authState;
	}

	setAuthPersistence(rememberMe?: boolean): Observable<void> {
		const setPersistence = rememberMe
			? this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			: this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
		return from(setPersistence);
	}

	doLoginWithCredentials(credentials: { email: string, password: string }): Observable<UserCredential> {
		return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
	}

	logout(): Observable<void> {
		return from(this.afAuth.auth.signOut());
	}

	register(values: UserInterface): Observable<UserCredential> {
		return from(this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password));
	}

	sendVerificationMail(): Observable<void> {
		return from(this.afAuth.auth.currentUser.sendEmailVerification());
	}

	requestPassword(email: string): Observable<void> {
		return from(this.afAuth.auth.sendPasswordResetEmail(email));
	}

	getCreationBy(): string {
		return this.afAuth.auth.currentUser.uid;
	}

	getCreationAt(): any {
		return firebase.firestore.FieldValue.serverTimestamp();
	}

	doFacebookLogin(): Observable<UserCredential> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return from(this.afAuth.auth.signInWithPopup(provider));
	}

	doTwitterLogin(): Observable<UserCredential> {
		const provider = new firebase.auth.TwitterAuthProvider();
		return from(this.afAuth.auth.signInWithPopup(provider));
	}

	doGoogleLogin(): Observable<UserCredential> {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		return from(this.afAuth.auth.signInWithPopup(provider));
	}

}
