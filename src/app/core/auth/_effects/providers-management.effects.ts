import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, exhaustMap, map, mapTo } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
	CodeSent, LinkError, LinkSuccess, ProvidersManagementActionTypes, UnlinkError, UnlinkSuccess
} from '../_actions/providers.management.actions';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import ConfirmationResult = firebase.auth.ConfirmationResult;

@Injectable()
export class ProvidersManagementEffects {

	@Effect()
	linkToGoogleAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.LinkGoogleAccount),
		exhaustMap(actins => {
			return from(this.doLinkToGoogleProvider()).pipe(
				mapTo(new LinkSuccess({ provider: 'google' })),
				catchError(error => of(new LinkError(error)))
			);
		})
	);

	@Effect()
	linkToFacebookAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.LinkFacebookAccount),
		exhaustMap(actions => {
			return from(this.doLinkToFacebookProvider()).pipe(
				mapTo(new LinkSuccess({ provider: 'facebook' })),
				catchError(error => of(new LinkError(error)))
			);
		})
	);

	@Effect()
	linkToCredentialsAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.LinkCredentialAccount),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			return from(this.reAuthenticate().then(async res => {
				await this.doLinkToCredentials(this.afAuth.auth.currentUser.email, payload.password);
			})).pipe(
				mapTo(new LinkSuccess({ provider: 'password' })),
				catchError(error => {
					if (error.code === 'auth/popup-blocked') {
						return from(this.reAuthenticateWithRedirect().then(async res => {
							await this.doLinkToCredentials(this.afAuth.auth.currentUser.email, payload.password);
						})).pipe(
							mapTo(new LinkSuccess({ provider: 'password' })),
							catchError(error1 => of(new LinkError(error1)))
						);
					} else {
						return of(new LinkError(error));
					}
				})
			);
		})
	);

	@Effect()
	unlinkGoogleAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.UnlinkGoogleAccount),
		exhaustMap(actions => {
			return from(this.doUnlinkToGoogleProvider()).pipe(
				mapTo(new UnlinkSuccess({ provider: 'google' })),
				catchError(error => of(new UnlinkError(error)))
			);
		})
	);

	@Effect()
	unlinkFacebookAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.UnlinkFacebookAccount),
		exhaustMap(actions => {
			return from(this.doUnlinkToFacebookProvider()).pipe(
				mapTo(new UnlinkSuccess({ provider: 'facebook' })),
				catchError(error => of(new UnlinkError(error)))
			);
		})
	);

	@Effect()
	unlinkCredentialsAccount$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.UnlinkCredentialAccount),
		exhaustMap(action => {
			return from(this.reAuthenticate().then(async res => {
				await this.doUnlinkToCredentials();
			})).pipe(
				mapTo(new UnlinkSuccess({ provider: 'password' })),
				catchError(error => of(new UnlinkError(error)))
			);
		})
	);

	@Effect()
	unlinkPhone$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.UnlinkPhoneNumber),
		exhaustMap(action => {
			return from(this.doUnlinkPhoneNumber()).pipe(
				mapTo(new UnlinkSuccess({ provider: 'phone' })),
				catchError(error => of(new UnlinkError(error)))
			);
		})
	);

	@Effect()
	sendCodeToPhone$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.SendPhoneNumberCode),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			return from((() => {
				return this.afAuth.auth.currentUser.linkWithPhoneNumber(payload.number, new firebase.auth.RecaptchaVerifier(payload.captchaContainerId, {
					size: 'invisible',
					callback: token => {
						// tslint:disable-next-line:no-console
						console.debug('Captcha token', token);
					}
				})).then(confirmation => {
					this.phoneNumberConfirmation = confirmation;
				});
			})()).pipe(
				mapTo(new CodeSent()),
				catchError(error => of(new LinkError(error)))
			);
		})
	);

	@Effect()
	verifyCode$: Observable<Action> = this.actions$.pipe(
		ofType(ProvidersManagementActionTypes.VerifyPhoneNumber),
		// @ts-ignore
		map(action => action.payload),
		exhaustMap(payload => {
			return from(this.phoneNumberConfirmation.confirm(payload.code)).pipe(
				mapTo(new LinkSuccess({ provider: 'phone' })),
				catchError(error => of(new LinkError(error)))
			);
		})
	);

	private phoneNumberConfirmation: ConfirmationResult;

	private doLinkToGoogleProvider(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.afAuth.auth.currentUser.linkWithPopup(provider);
	}

	private doUnlinkToGoogleProvider(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.afAuth.auth.currentUser.unlink(provider.providerId);
	}

	private doLinkToFacebookProvider(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.currentUser.linkWithPopup(provider);
	}

	private doUnlinkToFacebookProvider(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.currentUser.unlink(provider.providerId);
	}

	private doUnlinkPhoneNumber(): Promise<any> {
		const provider = new firebase.auth.PhoneAuthProvider();
		return this.afAuth.auth.currentUser.unlink(provider.providerId);
	}

	private doLinkToCredentials(email: string, password: string): Promise<any> {
		const credentials = EmailAuthProvider.credential(email, password);
		return this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credentials);
	}

	private doUnlinkToCredentials(): Promise<any> {
		return this.afAuth.auth.currentUser.unlink(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD);
	}

	private doFacebookReAuthentication(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
	}

	private doFacebookReAuthenticationWithRedirect(): Promise<any> {
		const provider = new firebase.auth.FacebookAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithRedirect(provider);
	}

	private reAuthenticate(): Promise<any> {
		return this.afAuth.auth.fetchSignInMethodsForEmail(this.afAuth.auth.currentUser.email).then(
			async res => {
				if (res.indexOf('facebook.com') >= 0) {
					await this.doFacebookReAuthentication();
					return;
				} else {
					await this.doGoogleReAuthentication();
					return;
				}
			}
		);
	}

	private reAuthenticateWithRedirect(): Promise<any> {
		return this.afAuth.auth.fetchSignInMethodsForEmail(this.afAuth.auth.currentUser.email).then(
			async res => {
				if (res.indexOf('facebook.com') >= 0) {
					await this.doFacebookReAuthenticationWithRedirect();
					return;
				} else {
					await this.doGoogleReAuthenticationWithRedirect();
					return;
				}
			}
		);
	}

	private doGoogleReAuthentication(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
	}

	private doGoogleReAuthenticationWithRedirect(): Promise<any> {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.afAuth.auth.currentUser.reauthenticateWithPopup(provider);
	}

	constructor(private actions$: Actions,
				private afAuth: AngularFireAuth) {

	}

}
