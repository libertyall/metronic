import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
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
			switchMap((user: User) => {
				if (!user) {
					this.router.navigateByUrl('/auth/login');
					return of(false);
				}
			}),
			catchError((error: any) => {
				console.log(error);
				this.router.navigateByUrl('/auth/login');
				return of(false);
			})
		);
	}
}
