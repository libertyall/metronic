import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { UserInterface } from '../../../../../core/auth/_interfaces/user.interface';
import { currentUser } from '../../../../../core/auth/_selectors/auth.selectors';
import { logout } from '../../../../../core/auth/_actions/auth.actions';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {

	user$: Observable<UserInterface>;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}

	logout() {
		this.store.dispatch(logout());
	}
}
