import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { currentUser } from '../../../../../core/auth/_selectors/auth.selectors';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	user$: Observable<IUser>;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}

	logout() {
		this.store.dispatch(new Logout());
	}
}
