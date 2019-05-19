import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { Logout } from '../../../../../core/auth/_actions/auth.actions';
import { AuthService } from '../../../../../core/auth/_services/auth.service';
import { Router } from '@angular/router';
import { AuthNoticeService } from '../../../../../core/auth/auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

	constructor(private store: Store<AppState>,
				private translate: TranslateService,
				private router: Router,
				private authNoticeService: AuthNoticeService,
				private authService: AuthService) {
	}

	ngOnInit(): void {
	}

	logout() {

		this.authService.signOut()
			.then(() => {
				this.store.dispatch(new Logout());
				this.router.navigateByUrl('/').then(() => console.log('navigate to dashboard'));
			})
			.catch((error) => {
				console.log(error);
				this.authNoticeService.setNotice(this.translate.instant('AUTH.LOGOUT') + error, 'danger');
			});
	}
}
