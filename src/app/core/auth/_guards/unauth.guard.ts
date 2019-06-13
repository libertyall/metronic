import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getUser, isUserLogged } from '../_reducers/auth.reducer';
import { catchError, map, take } from 'rxjs/operators';
import { User } from 'firebase';
import { AuthService } from '../_services/auth.service';
import { Logout } from '../_actions/auth.actions';

@Injectable()
export class UnAuthGuard implements CanActivate {

	constructor(private router: Router,
				private authService: AuthService,
				private store: Store<AppState>) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.authService.getAuthState().pipe(
			take(1),
			map((user: User) => {
				if (user) {
					this.router.navigateByUrl('/dashboard').then(() => console.log('already logged in'));
				}
			}),
			catchError((error: any) => {
				this.store.dispatch(new Logout());
				this.router.navigateByUrl('/auth/login').then(() => console.log('error in unauth guard', error));
				return of(false);
			})
		);
	}
}
