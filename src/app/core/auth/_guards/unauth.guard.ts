import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { isLoggedIn } from '../_selectors/auth.selectors';

@Injectable()
export class UnAuthGuard implements CanActivate {
	constructor(private store: Store<AppState>, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store
			.pipe(
				select(isLoggedIn),
				map(loggedIn => {
					if (loggedIn) {
						this.router.navigate(['/dashboard']).then(() => console.log('redirected because already logged in!'));
						return false;
					} else {
						return true;
					}
				})
			);
	}
}
