import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../_services';
import {
	acceptTerms,
	authMessage,
	forgotPassword,
	logout,
	register,
	registerSuccess,
	sendVerificationMail
} from '../_actions/auth.actions';
import {of} from 'rxjs';
import {UserService} from '../_services/user.service';
import UserCredential = firebase.auth.UserCredential;
import {userCreate} from '../_actions/user.actions';

@Injectable()
export class AuthEffects {

	private returnUrl: string;

	constructor(private actions$: Actions,
				private router: Router,
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
				map((user: UserCredential) => userCreate({ data: {userCredential: user, userData: action.user }})),
				map(() => sendVerificationMail()),
				map(() => logout()),
				map(() => registerSuccess()),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			);
		})
	));

	registerSuccess = createEffect(() => this.actions$.pipe(
		ofType(registerSuccess),
		exhaustMap(action => of(authMessage({code: 'auth/register-success', color: 'success'})))
	));

	sendVerificationMail = createEffect(() => this.actions$.pipe(
		ofType(sendVerificationMail),
		exhaustMap(() => this.authService.sendVerificationMail())
	), {dispatch: false});

	logout = createEffect(() => this.actions$.pipe(
		ofType(logout),
		exhaustMap(() => this.authService.logout())
	), {dispatch: false});

	forgotPassword = createEffect(() => this.actions$.pipe(
		ofType(forgotPassword),
		exhaustMap(action => {
			return this.authService.requestPassword(action.email).pipe(
				map(() => authMessage({code: 'auth/reminder-sent', color: 'success'})),
				catchError(error => of(authMessage({code: error.code, color: 'danger'})))
			);
		})
	)); // , {dispatch: false})

	/*authMessage = createEffect(() => this.actions$.pipe(
		ofType(authMessage),
		map((error) => console.log(error)) // of({ test: 'error' }))
	), {dispatch: false});

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
				map(() => new UserRequested()),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect({ dispatch: false })
	saveUser$ = this.actions$.pipe(
		ofType(AuthActionTypes.UserSave),
		map((action: AuthActionTypes.UserSave) => action),
		switchMap((payload: any) => this.authService.saveUser(payload.user))
	);

 @Effect()
	 googleLogin: Observable<Action> = this.actions$.pipe(
	 ofType(AuthActionTypes.GoogleLogin),
	 map((action: GoogleLogin) => action.payload),
	 exhaustMap(() => {
	 return from(this.authServiceService.doGoogleLogin()).pipe(
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
	 return from(this.authServiceService.doFacebookLogin()).pipe(
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
	 map((action: TwitterLogi) => action.payload),
	 exhaustMap(() => {
	 return from(this.authServiceService.doTwitterLogin()).pipe(
	 map(() => {
	 return new GetUser();
	 }),
	 catchError(error => of(new AuthError(error)))
	 );
	 })
	 );

	@Effect({ dispatch: false })
	loadUser$ = this.actions$.pipe(
		ofType<UserRequested>(AuthActionTypes.UserRequested),
		withLatestFrom(this.store.pipe(select(isUserLoaded))),
		filter(([action, _isUserLoaded]) => !_isUserLoaded),
		mergeMap(([action, _isUserLoaded]) => {
			console.log(_isUserLoaded);
			return this.authService.getUserById(_isUserLoaded);
			// this.authService.getUserByToken()
		}),
		map(_user => {
			console.log(_user);
			if (_user) {
				this.store.dispatch(new UserLoaded({ user: _user }));
			} else {
				this.store.dispatch(new Logout());
			}
		})
	);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of(getAuthUser());
	}); */
}
