import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';
import { Router } from '@angular/router';
import { getUser } from '../../../../../core/auth/_reducers/auth.reducer';
import { AuthNoticeService } from '../../../../../core/auth/auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	user$: Observable<IUser>;

	constructor(private router: Router,
				private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private store: Store<AppState>) {
	}

	ngOnInit() {
		this.user$ = this.store.select(getUser);
	}

	logout() {
		this.store.dispatch(new Logout());
		// this.router.navigateByUrl('/').then(() => console.log('logout'));
		// this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGOUT'), 'success');
	}
}
