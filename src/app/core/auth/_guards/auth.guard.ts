import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map, switchAll, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../_services";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router,
				private authService: AuthService,
				private auth: AngularFireAuth,
				/* private alertService: AlertService */) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		return this.auth.user.pipe(
			first(),
			map((user: User) => {
				if (!user) {
					this.router.navigate(['/auth/login']).then(() => 'redirect to login');
				}
				/*if (user && !user.emailVerified) {
					this.alertService.showSnackBar('error', 'Global.Login.notVerified');
				  return this.authService.signOut();
				}*/
				return !!user;
			})
		);
	}

}
