import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getUser, isUserLogged } from '../_reducers/auth.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class UnAuthGuard implements CanActivate {

	constructor(private router: Router,
				private store: Store<AppState>) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.store
			.pipe(
				select(getUser),
				map(user => {
					if (user) {
						this.router.navigateByUrl('/dashboard').then(() => console.log('already logged in'));
					}
					return true;
				})
			);
	}
}
