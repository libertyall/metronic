import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map, switchAll, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../_services";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { isLoggedIn } from '../_selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router,
				private store: Store<AppState>,) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		const observable = this.store.select(isLoggedIn);

		// redirect to sign in page if user is not authenticated
		observable.subscribe(authenticated => {
			if (!authenticated) {
				redirectUnauthorizedTo(['login']);
			}
		});

		return observable;
	}

}
