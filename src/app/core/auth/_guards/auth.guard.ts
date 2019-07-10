import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthService } from '../_services';
import { User } from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private translate: TranslateService,
				private authNoticeService: AuthNoticeService,
				private store: Store<AppState>,
				private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.getAuthState().pipe(
			take(1),
			map((user: User) => {
				if (!user) {
					this.router.navigateByUrl('/auth/login').then();
					return false;
				}
				if (user && user.providerId === 'password' && !user.emailVerified) {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.VERIFYEMAIL'), 'danger');
					this.router.navigateByUrl('/auth/login').then(() => console.log('email verification needed'));
					return false;
				}
				return true;
			}),
			catchError((error: any) => {
				this.router.navigateByUrl('/auth/login').then(() => console.log(error));
				return of(false);
			})
		);
	}
}
