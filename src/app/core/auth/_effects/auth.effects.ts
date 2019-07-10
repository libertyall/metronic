import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, from, Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AuthService } from '../_services';
import { AppState } from '../../reducers';
import { credentialsLogin, getAuthUser } from '../_actions/auth.actions';

@Injectable()
export class AuthEffects {

	private returnUrl: string;

	constructor(private actions$: Actions,
				private router: Router,
				private auth: AuthService,
				private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}

	/* @Effect({ dispatch: false })
	login$ = this.actions$.pipe(
		ofType<Login>(AuthActionTypes.Login),
		tap(action => {
			// localStorage.setItem(environment.authTokenKey, action.payload.authToken);
			this.store.dispatch(new UserRequested());
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
			return from(this.auth.doLoginWithCredentials(credentials)).pipe(
				map(() => new UserRequested()),
				catchError(error => of(new AuthError(error)))
			);
		})
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.pipe(
		ofType<Logout>(AuthActionTypes.Logout),
		tap(() => {
			// localStorage.removeItem(environment.authTokenKey);
			this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } }).then(() => console.log(123));
		})
	);

	/* @Effect({ dispatch: false })
	register$ = this.actions$.pipe(
		ofType<Register>(AuthActionTypes.Register),
		tap(action => {
			console.log('register');
			// localStorage.setItem(environment.authTokenKey, action.payload.authToken);
		})
	);

	@Effect({ dispatch: false })
	saveUser$ = this.actions$.pipe(
		ofType(AuthActionTypes.UserSave),
		map((action: AuthActionTypes.UserSave) => action),
		switchMap((payload: any) => this.auth.saveUser(payload.user))
	);

	/* @Effect()
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
	 map((action: TwitterLogi) => action.payload),
	 exhaustMap(() => {
	 return from(this.authService.doTwitterLogin()).pipe(
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
			return this.auth.getUserById(_isUserLoaded);
			// this.auth.getUserByToken()
		}),
		map(_user => {
			console.log(_user);
			if (_user) {
				this.store.dispatch(new UserLoaded({ user: _user }));
			} else {
				this.store.dispatch(new Logout());
			}
		})
	); */

	/* @Effect()
	init$: Observable<Action> = defer(() => {
		return of(getAuthUser());
	}); */
}
