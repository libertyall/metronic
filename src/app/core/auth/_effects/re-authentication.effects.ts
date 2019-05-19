import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AngularFireAuth } from '@angular/fire/auth';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
	AuthActions, AuthActionTypes, CredentialsReAuthentication, FacebookReAuthentication, GoogleReAuthentication,
	ReAuthenticationError, ReAuthenticationSuccess
} from '../_actions/auth.actions';

export type Action = AuthActions;

@Injectable()
export class ReAuthenticationEffects {

	constructor(private actions: Actions,
				private afAuth: AngularFireAuth) {
	}

	@Effect()
	googleReAuthentication: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.GoogleReAuthentication),
		map((action: GoogleReAuthentication) => action.payload),
		exhaustMap(() => {
			return from(this.doGoogleReAuthentication()).pipe(
				map(() => {
					return new ReAuthenticationSuccess();
				}),
				catchError(error => of(new ReAuthenticationError(error)))
			);
		})
	);

	@Effect()
	facebookReAuthentication: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.FacebookReAuthentication),
		map((action: FacebookReAuthentication) => action.payload),
		exhaustMap(() => {
			return from(this.doFacebookReAuthentication()).pipe(
				map(() => {
					return new ReAuthenticationSuccess();
				}),
				catchError(error => of(new ReAuthenticationError(error)))
			);
		})
	);

	@Effect()
	reAuthenticateWithCredentials: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.CredentialsReAuthentication),
		map((action: CredentialsReAuthentication) => {
			return {
				email: action.email,
				password: action.password
			};
		}),
		exhaustMap(credentials => {
			return from(this.doReAuthenticationWithCredentials(credentials)).pipe(
				map(() => {
					return new ReAuthenticationSuccess();
				}),
				catchError(error => of(new ReAuthenticationError(error)))
			);
		})
	);

	private doFacebookReAuthentication(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
	}

	private doGoogleReAuthentication(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
	}

	private doReAuthenticationWithCredentials(credentials: { email: string, password: string }): Promise<any> {
		const credential = firebase.auth.EmailAuthProvider.credential(
			credentials.email,
			credentials.password
		);
		return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
	}
}
