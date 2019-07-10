// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { currentUser } from '../../../../../core/auth/_selectors/auth.selectors';
import { logout } from '../../../../../core/auth/_actions/auth.actions';
import { UserInterface } from '../../../../../core/auth/_interfaces/user.interface';

@Component({
	selector: 'kt-user-profile3',
	templateUrl: './user-profile3.component.html'
})
export class UserProfile3Component implements OnInit {
	// Public properties
	user$: Observable<UserInterface>;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}

	logout() {
		this.store.dispatch(logout());
	}
}
