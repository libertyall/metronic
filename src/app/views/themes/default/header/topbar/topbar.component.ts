import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

	constructor(private store: Store<AppState>) {
	}

	logout() {
		this.store.dispatch(new Logout());
	}
}
