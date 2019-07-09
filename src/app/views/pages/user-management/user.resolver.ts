import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IUser } from '../../../core/auth/_interfaces/user.interface';
import { UserService } from '../../../shared/services/user/user.service';
import { AllCategoriesRequested } from '../../../core/category/actions/category.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { selectUserById } from '../../../core/auth/_selectors/user.selectors';
import { GetUser } from '../../../core/auth/_actions/auth.actions';

@Injectable()
export class UserResolver implements Resolve<IUser> {

	constructor(private userService: UserService,
				private store: Store<AppState>,
				private router: Router) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
		this.store.dispatch(new AllCategoriesRequested());
		return this.waitForUserToLoad(route.params['userId']);
	}


	waitForUserToLoad(userId: string): Observable<IUser> {
		return this.store.pipe(
			select(selectUserById(userId)),
			map(user => {
				if (!user) {
					this.router.navigate(['/users']).then(() => console.log('no user found'));
				}
				this.store.dispatch(new GetUser({
					userId
				}));
				return user;
			}),
			first()
		);
	}

}
