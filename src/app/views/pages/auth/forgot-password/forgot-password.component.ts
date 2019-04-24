import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { AuthService } from '../../../../core/auth/_services/auth.service';

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>;

	constructor(
		private authService: AuthService,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.initRegistrationForm();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			email: [ '', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			]
		});
	}


	submit() {
		const controls = this.forgotPasswordForm.controls;
		if (this.forgotPasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			return;
		}
		this.loading = true;
		const email = controls[ 'email' ].value;

		this.authService.requestPassword(email).then(() => {
			this.authNoticeService.setNotice(this.translate.instant('AUTH.FORGOT.SUCCESS'), 'success');
			this.router.navigateByUrl('/auth/login').then(() => console.log('forgot-password'));
			this.loading = false;
		}).catch((error) => {
			console.log(error);
			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', { name: this.translate.instant('AUTH.INPUT.EMAIL') }), 'danger');
			this.loading = false;
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[ controlName ];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
