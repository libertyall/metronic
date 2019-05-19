import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AngularFireAuth } from '@angular/fire/auth';

import { catchError, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import { from, Observable, of, zip } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Action } from '@ngrx/store';
import {
	AuthActionTypes, Authenticated, AuthError, CredentialsLogin, DeleteAccountError, DeleteAccountSuccess,
	FacebookLogin, GetUser, GoogleLogin, Logout, NotAuthenticated
} from '../_actions/auth.actions';
import { SetProviders } from '../_actions/providers.management.actions';
import { IUser } from '../_interfaces/user.interface';
import UserCredential = firebase.auth.UserCredential;

const PROVIDERS_MAP = {};
PROVIDERS_MAP[firebase.auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD] = 'facebook';
PROVIDERS_MAP[firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD] = 'google';
PROVIDERS_MAP[firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD] = 'password';
PROVIDERS_MAP[firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD] = 'phone';

@Injectable()
export class LoginEffects {

	@Effect()
	getUser: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.GetUser),
		map((action: GetUser) => action.payload),
		exhaustMap(() => this.afAuth.authState.pipe(
			take(1),
			switchMap(authData => {
				if (authData) {
					return zip(from(authData.getIdToken(true))).pipe(
						switchMap(() => {
							const providers = authData.providerData.reduce((prev, current) => {
								const key = PROVIDERS_MAP[current.providerId];
								if (key) {
									prev[key] = true;
								}
								return prev;
							}, {});
							const user: IUser = {
								uid: authData.uid,
								displayName: authData.displayName,
								email: authData.email,
								phoneNumber: authData.phoneNumber,
								photoURL: authData.photoURL,
								emailVerified: authData.emailVerified
							};
							return from([new SetProviders(providers), new Authenticated({ user })]);
						})
					);
				} else {
					return of(new NotAuthenticated());
				}
			}))
		)
	);

	@Effect()
	googleLogin: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.GoogleLogin),
		map((action: GoogleLogin) => action.payload),
		exhaustMap(payload => {
			return from(this.doGoogleLogin()).pipe(
				map(() => {
					return new GetUser();
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	facebookLogin: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.FacebookLogin),
		map((action: FacebookLogin) => action.payload),
		exhaustMap(payload => {
			return from(this.doFacebookLogin()).pipe(
				map(() => {
					return new GetUser();
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	loginWithCredentials: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.CredentialsLogin),
		map((action: CredentialsLogin) => {
			return {
				email: action.email,
				password: action.password,
				remember: (action.remember) ? action.remember : false
			};
		}),
		exhaustMap(credentials => {
			return from(this.doLoginWithCredentials(credentials)).pipe(
				map(() => {
					return new GetUser();
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	logout: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.Logout),
		map((action: Logout) => action.payload),
		exhaustMap(() => {
			return from(this.afAuth.auth.signOut());
		}),
		map(() => {
			return new NotAuthenticated();
		})
	);

	@Effect()
	onDeleteNotVerifiedAccount$: Observable<any> = this.actions$.pipe(
		ofType(AuthActionTypes.DeleteAccount),
		switchMap(() => {
			return from(this.afAuth.auth.currentUser.delete()).pipe(
				map(() => new DeleteAccountSuccess()),
				catchError(error => of(new DeleteAccountError(error)))
			);
		})
	);

	@Effect({ dispatch: false })
	refreshToken$ = this.actions$.pipe(
		ofType(AuthActionTypes.RefreshToken),
		tap(() => this.afAuth.auth.currentUser.getIdToken(true))
	);

	constructor(private actions$: Actions,
				private afAuth: AngularFireAuth) {
	}

	private doFacebookLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.signInWithPopup(provider);
	}

	private doGoogleLogin(): Promise<UserCredential> {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		return this.afAuth.auth.signInWithPopup(provider);
	}

	private doLoginWithCredentials(credentials: { email: string, password: string, remember?: boolean }): Promise<UserCredential> {
		if (credentials.remember) {
			return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
				return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
			});
		} else {
			return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
				return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
			});
		}
	}

}
