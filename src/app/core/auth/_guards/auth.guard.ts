import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState} from '../../reducers';
import { isLoggedIn } from '../_selectors/auth.selectors';
import { getUserState } from '../_reducers/auth.reducer';
import { State } from '../_reducers/auth-user.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
        return this.store
            .pipe(
                select(getUserState),
                tap(loggedIn => {
                	console.log(loggedIn);
                    if (!loggedIn) {
                        this.router.navigateByUrl('/auth/login').then(() => console.log('not logged in'));
                    }
                })
            );
    }
}
