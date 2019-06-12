import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';
import { Router } from '@angular/router';
import { getUser } from '../../../../../core/auth/_reducers/auth.reducer';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	user$: Observable<IUser>;

	constructor(private router: Router,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		this.user$ = this.store.select(getUser);
	}

	logout() {
		this.store.dispatch(new Logout());
	}
}
