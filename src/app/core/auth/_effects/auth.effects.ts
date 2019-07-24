import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {AuthService} from '../_services';
import {
	acceptTerms,
	accountNotVerified,
	authMessage,
	credentialsLogin,
	credentialsLoginSuccess,
	facebookLogin,
	facebookLoginSuccess,
	forgotPassword,
	googleLogin,
	googleLoginSuccess,
	logout,
	logoutSuccess,
	register,
	sendVerificationMail,
	setAuthUser,
	twitterLogin,
	twitterLoginSuccess
} from '../_actions/auth.actions';
import {of} from 'rxjs';
import {UserService} from '../_services/user.service';
import {UserInterface} from '../_interfaces/user.interface';
import {Store} from '@ngrx/store';
import { AppState } from '../../../app.state';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class AuthEffects {

	private returnUrl: string;

	constructor(private actions$: Actions,
				private router: Router,
				private store: Store<AppState>,
				private userService: UserService,
				private authService: AuthService) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}

	acceptTerms = createEffect(() => this.actions$.pipe(
		ofType(acceptTerms),
		map(() => authMessage({code: 'AUTH.VALIDATION.ACCEPTTERMS', color: 'warning'}))
	));

	register = createEffect(() => this.actions$.pipe(
		ofType(register),
		exhaustMap(action => {
			return this.authService.register(action.user).pipe(
				switchMap((user: UserCredential) => this.userService.createUser(user)),
				switchMap((user: UserInterface) => this.userService.updateUser(user.id, action.user)),
				map(() => sendVerificationMail()),
				map(() => logout()),
				map(() => authMessage({code: 'auth/register-success', color: 'success'})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			);
		}),
		catchError(error => of(authMessage({code: error.code, color: 'danger'})))
	));

	sendVerificationMail = createEffect(() => this.actions$.pipe(
		ofType(sendVerificationMail),
		exhaustMap(action => this.authService.sendVerificationMail().pipe(
			map(() => authMessage({code: 'send-verification', color: 'success'}))
		))
	));

	credentialsLogin = createEffect(() => this.actions$.pipe(
		ofType(credentialsLogin),
		exhaustMap(action => {
			return this.authService.setAuthPersistence(action.credentials.rememberMe).pipe(
				switchMap(() => this.authService.doLoginWithCredentials({
					email: action.credentials.email,
					password: action.credentials.password
				})),
				switchMap((user: UserCredential) => this.userService.createUser(user)),
				map((user) => credentialsLoginSuccess({user, isLoggedIn: true}))
			);
		}),
		catchError(error => of(authMessage({code: error.code, color: 'danger'})))
	));

	logout = createEffect(() => this.actions$.pipe(
		ofType(logout),
		exhaustMap(() => this.authService.logout()),
		map(() => logoutSuccess({code: 'auth/logged-out', color: 'success'}))
	));

	accountNotVerified = createEffect(() => this.actions$.pipe(
		ofType(accountNotVerified),
		map(() => authMessage({code: 'auth/not-verified', color: 'warning'}))
	));

	forgotPassword = createEffect(() => this.actions$.pipe(
		ofType(forgotPassword),
		exhaustMap(action => {
			return this.authService.requestPassword(action.email).pipe(
				map(() => authMessage({code: 'auth/reminder-sent', color: 'success'})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			);
		})
	));

	/**
	 * Social Logins
	 */
	googleLogin = createEffect(() => this.actions$.pipe(
		ofType(googleLogin),
		exhaustMap(action =>
			this.authService.doGoogleLogin().pipe(
				switchMap((user: UserCredential) => this.userService.createUser(user)),
				map((user) => googleLoginSuccess({user})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			))
	));

	facebookLogin = createEffect(() => this.actions$.pipe(
		ofType(facebookLogin),
		exhaustMap(action =>
			this.authService.doFacebookLogin().pipe(
				switchMap((user: UserCredential) => this.userService.createUser(user)),
				map((user) => facebookLoginSuccess({user})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			))
	));

	twitterLogin = createEffect(() => this.actions$.pipe(
		ofType(twitterLogin),
		exhaustMap(action =>
			this.authService.doTwitterLogin().pipe(
				switchMap((user: UserCredential) => this.userService.createUser(user)),
				map((user) => twitterLoginSuccess({user})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			))
	));

	init = createEffect(() => this.actions$.pipe(
		ofType(ROOT_EFFECTS_INIT),
		exhaustMap(() => this.authService.authUser$.pipe(
			map((user) => setAuthUser({user, isLoggedIn: !!user}))
		))
	));

}
