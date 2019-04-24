import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { AuthNotice } from '../../../../core/auth/auth-notice/auth-notice.interface';

@Component({
	selector: 'kt-auth-notice',
	templateUrl: './auth-notice.component.html',
})
export class AuthNoticeComponent implements OnInit, OnDestroy {
	@Output() type: any;
	@Output() message: any = '';

	private subscriptions: Subscription[] = [];

	constructor(public authNoticeService: AuthNoticeService,
				private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscriptions.push(this.authNoticeService.onNoticeChanged$.subscribe(
			(notice: AuthNotice) => {
				notice = Object.assign({}, { message: '', type: '' }, notice);
				this.message = notice.message;
				this.type = notice.type;
				this.cdr.detectChanges();
			}
		));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
