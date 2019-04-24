import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { currentUser } from '../../../../../core/auth/_selectors/auth.selectors';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {

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
