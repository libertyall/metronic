import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import { defer, from, Observable, of, zip } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Action } from '@ngrx/store';
import {
	AuthActionTypes, Authenticated, AuthError, CredentialsLogin, CredentialsRegistration, FacebookLogin, GetUser,
	GoogleLogin, Logout, NotAuthenticated, SaveUser, TwitterLogin
} from '../_actions/auth.actions';
import { SetProviders } from '../_actions/providers.management.actions';
import { IUser } from '../_interfaces/user.interface';
import { AuthService } from '../_services/auth.service';
import { User } from 'firebase';
import { GravatarService } from '../_services/gravatar.service';
import { Router } from '@angular/router';

const PROVIDERS_MAP = {};
PROVIDERS_MAP[firebase.auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD] = 'facebook';
PROVIDERS_MAP[firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD] = 'google';
PROVIDERS_MAP[firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD] = 'password';
PROVIDERS_MAP[firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD] = 'phone';

@Injectable()
export class LoginEffects {

	constructor(private actions$: Actions,
				private router: Router,
				private gravatarService: GravatarService,
				private authService: AuthService) {
	}

	@Effect()
	registerAction$ = this.actions$.pipe(
		ofType(AuthActionTypes.CredentialsRegistration),
		map((action: CredentialsRegistration) => action.payload),
		switchMap(payload =>
			from(this.authService.register(payload)).pipe(
				map((res: any) => {
					const gravatarUrl = this.gravatarService.getUserGravatar(res.user.email);
					return {
						uid: res.user.uid,
						displayName: payload.username || res.user.displayName,
						email: res.user.email,
						providerId: res.additionalUserInfo.providerId,
						photoURL: res.user.photoURL || gravatarUrl,
						isNewUser: res.additionalUserInfo.isNewUser,
						assignedRoles: {
							subscriber: true
						},
						isOnline: true
					};
				}),
				/* map((user: IUser) => {
				 console.log(user);
				 return user;
				 return [
				 new RegistrationSuccess(),
				 new LoginS({ user }),
				 new SaveUser({ user })
				 ];
				 }), */
				tap((u) => {
					console.log(u);
					this.router.navigateByUrl('');
				}),
				catchError(error => of(new AuthError({ error })))
			)
		)
	);

	@Effect()
	getUser: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.GetUser),
		map((action: GetUser) => action.payload),
		exhaustMap(() => {
				return from(this.authService.afAuth.authState).pipe(
					take(1),
					switchMap((authData: User) => {
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
										displayName: authData.displayName && authData.displayName !== '' ? authData.displayName : authData.email,
										email: authData.email,
										phoneNumber: authData.phoneNumber,
										creationAt: authData.metadata.creationTime,
										providerId: authData.providerData[0].providerId,
										photoURL: authData.photoURL || this.gravatarService.getUserGravatar(authData.email),
										lastSignInTime: authData.metadata.lastSignInTime,
										creationTime: authData.metadata.creationTime,
										emailVerified: authData.emailVerified
									};
									return from([new SetProviders(providers), new SaveUser({ user }), new Authenticated({ user })]);
								})
							);
						} else {
							return of(new NotAuthenticated());
						}
					}),
					tap((u) => {
						this.router.navigateByUrl('');
					})
				);
			}
		)
	);

	@Effect({ dispatch: false })
	saveUser$ = this.actions$.pipe(
		ofType(AuthActionTypes.SaveUser),
		map((action: SaveUser) => action.payload),
		switchMap((payload: any) => this.authService.saveUser(payload.user))
	);

	@Effect()
	googleLogin: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.GoogleLogin),
		map((action: GoogleLogin) => action.payload),
		exhaustMap(() => {
			return from(this.authService.doGoogleLogin()).pipe(
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
		exhaustMap(() => {
			return from(this.authService.doFacebookLogin()).pipe(
				map(() => {
					return new GetUser();
				}),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect()
	twitterLogin: Observable<Action> = this.actions$.pipe(
		ofType(AuthActionTypes.TwitterLogin),
		map((action: TwitterLogin) => action.payload),
		exhaustMap(() => {
			return from(this.authService.doTwitterLogin()).pipe(
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
				rememberMe: (action.rememberMe) ? action.rememberMe : false
			};
		}),
		exhaustMap(credentials => {
			return from(this.authService.doLoginWithCredentials(credentials)).pipe(
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
			return from(this.authService.signOut());
		}),
		map(() => {
			return new NotAuthenticated();
		})
	);

	/* @Effect()
	 onDeleteNotVerifiedAccount$: Observable<any> = this.actions$.pipe(
	 ofType(AuthActionTypes.DeleteAccount),
	 switchMap(() => {
	 return from(this.authService.currentUser.delete()).pipe(
	 map(() => new DeleteAccountSuccess()),
	 catchError(error => of(new DeleteAccountError(error)))
	 );
	 })
	 );

	 @Effect({ dispatch: false })
	 refreshToken$ = this.actions$.pipe(
	 ofType(AuthActionTypes.RefreshToken),
	 tap(() => this.authService.currentUser.getIdToken(true))
	 ); */

	@Effect()
	init$: Observable<any> = defer(() => {
		return of(new GetUser());
	});
}
