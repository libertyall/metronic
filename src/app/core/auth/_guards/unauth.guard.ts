import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { catchError, map, take } from 'rxjs/operators';
import { User } from 'firebase';
import { AuthService } from '../_services/auth.service';
import { Logout } from '../_actions/auth.actions';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UnAuthGuard implements CanActivate {

	constructor(private router: Router,
				private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private authService: AuthService,
				private store: Store<AppState>) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.getAuthState().pipe(
			take(1),
			map((user: User) => {
				if (user && (user.emailVerified || user.providerId !== 'password')) {
					this.router.navigateByUrl('/dashboard').then(() => console.log('already logged in'));
					return false;
				}
				if (user && user.providerId === 'password' && !user.emailVerified) {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGIN.VERIFYEMAIL'), 'danger');
				}
				return true;
			}),
			catchError((error: any) => {
				this.store.dispatch(new Logout());
				this.router.navigateByUrl('/auth/login').then(() => console.log('error in unauth guard', error));
				return of(false);
			})
		);
	}
}
