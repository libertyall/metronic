import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserInterface } from '../../../../../core/auth/_interfaces/user.interface';
import { logout } from '../../../../../core/auth/_actions/auth.actions';
import { Router } from '@angular/router';
import { AuthNoticeService } from '../../../../../core/auth/auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../../../../../store/app.state';
import { currentUser } from '../../../../../core/auth/_selectors/auth.selectors';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	user$: Observable<UserInterface>;

	constructor(private router: Router,
				private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		this.user$ = this.store.select(currentUser);
	}

	logout() {
		this.store.dispatch(logout());
	}
}
