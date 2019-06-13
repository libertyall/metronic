import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthService } from '../_services/auth.service';
import { User } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private store: Store<AppState>,
				private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.authService.getAuthState().pipe(
			take(1),
			map((user: User) => {
				console.log(user);
				if (!user) {
					this.router.navigateByUrl('/auth/login').then();
				}
				return of(user);
			}),
			catchError((error: any) => {
				this.router.navigateByUrl('/auth/login').then(() => console.log(error));
				return of(false);
			})
		);
	}
}
