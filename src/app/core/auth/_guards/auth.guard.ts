import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getUser } from '../_reducers/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private store: Store<AppState>, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.store
			.pipe(
				select(getUser),
				map(user => {
					console.log(user);
					/* if (!user) {
						this.router.navigateByUrl('/auth/login').then(() => console.log('not logged in'));
						return false;
					} */
				})
			);
	}
}
