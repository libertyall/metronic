import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { AuthService } from '../../../../core/auth/_services';
import { Store } from '@ngrx/store';
import { forgotPassword, logout } from '../../../../core/auth/_actions/auth.actions';
import { isLoading, selectAuthMessage } from '../../../../core/auth/_selectors/auth.selectors';
import { AppState } from '../../../../store/app.state';

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

	forgotPasswordForm: FormGroup;
	isLoading$: Observable<boolean>;
	length6 = 6;
	length320 = 320;

	constructor(private store: Store<AppState>,
				private authService: AuthService,
				public authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private router: Router,
				private fb: FormBuilder) {
	}

	ngOnInit() {
		this.initRegistrationForm();
		this.store.select(selectAuthMessage).subscribe((message) => this.authNoticeService.setNotice(message.code, message.color));
		this.isLoading$ = this.store.select(isLoading);
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.store.dispatch(logout());
	}

	initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			email: [
				'', Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(this.length6),
					Validators.maxLength(this.length320)
				])
			]
		});
	}

	submit() {
		const controls = this.forgotPasswordForm.controls;
		if (this.forgotPasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		const email = controls['email'].value;
		this.store.dispatch(forgotPassword({ email }));
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
