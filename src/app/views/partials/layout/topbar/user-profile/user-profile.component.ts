import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { UserInterface } from '../../../../../core/auth/_interfaces/user.interface';
import { logout } from '../../../../../core/auth/_actions/auth.actions';
import { Router } from '@angular/router';
import { AuthNoticeService } from '../../../../../core/auth/auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';

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
		// this.user$ = this.store.select(getUserState);
	}

	logout() {
		this.store.dispatch(logout());
		// this.router.navigateByUrl('/').then(() => console.log('logout'));
		// this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGOUT'), 'success');
	}
}
