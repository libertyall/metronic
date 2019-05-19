import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
	AuthActions, AuthActionTypes, AuthError, CredentialsRegistration, FacebookRegistration, GoogleRegistration,
	RegistrationSuccess, VerificationEmailError, VerificationEmailSent
} from '../_actions/auth.actions';
import { ProvidersManagementActions, SetProviders } from '../_actions/providers.management.actions';
import { IUser } from '../_interfaces/user.interface';
import UserCredential = firebase.auth.UserCredential;

export type Action = AuthActions | ProvidersManagementActions;

@Injectable()
export class RegistrationEffects {

	constructor(private actions: Actions,
				private afAuth: AngularFireAuth) {
	}

	@Effect()
	googleSignUp: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.GoogleRegistration),
		map((action: GoogleRegistration) => action.payload),
		exhaustMap(() => {
			return from(this.doGoogleRegistration()).pipe(
				switchMap(credential => {
					// tslint:disable-next-line:no-console
					console.debug('credential', credential);
					const authData = credential.user;
					const user: IUser = {
						uid: authData.uid,
						displayName: authData.displayName,
						email: authData.email,
						phoneNumber: authData.phoneNumber,
						emailVerified: authData.emailVerified,
						photoURL: authData.photoURL
					};
					return from([new SetProviders({ google: true }), new RegistrationSuccess({ user })]);
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	facebookSignUp: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.FacebookRegistration),
		map((action: FacebookRegistration) => action.payload),
		exhaustMap(payload => {
			return from(this.doFacebookRegistration()).pipe(
				switchMap(credential => {
					// tslint:disable-next-line:no-console
					console.debug('facebookSignUp', credential);
					const authData = credential.user;
					const user: IUser = {
						uid: authData.uid,
						displayName: authData.displayName,
						email: authData.email,
						phoneNumber: authData.phoneNumber,
						emailVerified: authData.emailVerified,
						photoURL: authData.photoURL
					};
					return from([new SetProviders({ facebook: true }), new RegistrationSuccess({ user })]);
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	signUpWithCredentials: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.CredentialsRegistration),
		map((action: CredentialsRegistration) => {
			return {
				email: action.payload.email,
				password: action.payload.password
			};
		}),
		exhaustMap(credentials => {
			return from(this.doSignUpWithCredentials(credentials)).pipe(
				map(credential => {
					// tslint:disable-next-line:no-console
					console.debug('doSignUpWithCredentials', credential);
					const authData = credential.user;
					const user: IUser = {
						uid: authData.uid,
						displayName: authData.displayName,
						email: authData.email,
						phoneNumber: authData.phoneNumber,
						emailVerified: authData.emailVerified,
						photoURL: authData.photoURL
					};
					return new RegistrationSuccess({ user });
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	sendVerificationEmail$: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.SendVerificationEmail),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			return from(this.afAuth.auth.currentUser.sendEmailVerification({ url: payload.redirectUrl })).pipe(
				map(p => {
					return new VerificationEmailSent();
				}),
				catchError(error => of(new VerificationEmailError(error)))
			);
		})
	);

	private doFacebookRegistration(): Promise<UserCredential> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.signInWithPopup(provider);
	}

	private doGoogleRegistration(): Promise<UserCredential> {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account'
		});
		return this.afAuth.auth.signInWithPopup(provider);
	}

	private doSignUpWithCredentials(credentials: { email: string, password: string }): Promise<UserCredential> {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}
}
