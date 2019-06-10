import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {IUser} from '../../../../../core/auth/_interfaces/user.interface';
import {Logout} from '../../../../../core/auth/_actions/auth.actions';
import {Router} from '@angular/router';
import {getUser, getUserState} from '../../../../../core/auth/_reducers/auth.reducer';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	user$: Observable<IUser>;

	constructor(private router: Router,
				private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(getUser));
	}

	logout() {
		this.store.dispatch(new Logout());
		this.router.navigate(['/auth/login']).then(() => 'successfully logged out');
	}
}
