import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {filter, tap, withLatestFrom} from 'rxjs/operators';
import {defer, Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {AuthService} from '../_services/auth.service';
import {AppState} from '../../reducers';
import {AuthActionTypes, Login, Logout, Register, UserRequested} from '../_actions/auth.actions';
import {isUserLoaded} from "../_selectors/auth.selectors";

@Injectable()
export class AuthEffects {

	constructor(private actions$: Actions,
				private router: Router,
				private auth: AuthService,
				private store: Store<AppState>) {
	}

	@Effect({dispatch: false})
	login$ = this.actions$.pipe(
		ofType<Login>(AuthActionTypes.Login),
		tap(action => {
			// localStorage.setItem(environment.firebaseConfig.apiKey, action.payload.authToken);
			this.store.dispatch(new UserRequested());
		}),
	);

	@Effect({dispatch: false})
	logout$ = this.actions$.pipe(
		ofType<Logout>(AuthActionTypes.Logout),
		tap(() => {
			// localStorage.removeItem(environment.firebaseConfig.apiKey);
			this.router.navigateByUrl('/auth/login').then(() => console.log('logout auth.effect'));
		})
	);

	@Effect({dispatch: false})
	register$ = this.actions$.pipe(
		ofType<Register>(AuthActionTypes.Register),
		tap(action => {
			// localStorage.setItem(environment.firebaseConfig.apiKey, action.payload.authToken);
		})
	);

	@Effect({dispatch: false})
	loadUser$ = this.actions$
		.pipe(
			ofType<UserRequested>(AuthActionTypes.UserRequested),
			withLatestFrom(this.store.pipe(select(isUserLoaded))),
			filter(([action, _isUserLoaded]) => !_isUserLoaded),
			tap(t => console.log(t))
			/*map((_user: IUser) => {
                if (_user) {
                    this.store.dispatch(new UserLoaded({ user: _user }));
                } else {
                    this.store.dispatch(new Logout());
                }
            })*/
		);

	@Effect()
	init$: Observable<Action> = defer(() => {
		return of({type: 'NO_ACTION'});
	});

}
