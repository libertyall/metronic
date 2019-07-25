import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import {AuthNoticeService} from '../../../../core/auth/auth-notice/auth-notice.service';
import {AuthService} from '../../../../core/auth/_services';
import {UserInterface} from '../../../../core/auth/_interfaces/user.interface';
import {acceptTerms, register, startRegister} from '../../../../core/auth/_actions/auth.actions';
import {isLoading, selectAuthMessage} from '../../../../core/auth/_selectors/auth.selectors';
import { AppState } from '../../../../store/app.state';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {

	registerForm: FormGroup;
	isLoading$: Observable<boolean>;

	length3 = 3;
	length100 = 100;
	length320 = 320;

	constructor(private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private router: Router,
				private auth: AuthService,
				private store: Store<AppState>,
				private fb: FormBuilder) {
	}

	ngOnInit() {
		this.initRegisterForm();
		this.store.select(selectAuthMessage).subscribe((message) => this.authNoticeService.setNotice(message.code, message.color));
		this.isLoading$ = this.store.select(isLoading);
	}

	ngOnDestroy(): void {
		this.resetAuthMessage();
	}

	resetAuthMessage(): void {
		this.authNoticeService.setNotice(null);
	}

	initRegisterForm() {
		this.registerForm = this.fb.group({
			lastName: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length100)
				])
			],
			firstName: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length100)
				])
			],
			email: [
				'', Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length320)
				])
			],
			displayName: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length100)
				])
			],
			password: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length100)
				])
			],
			confirmPassword: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(this.length3),
					Validators.maxLength(this.length100)
				])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}


	submit() {
		const controls = this.registerForm.controls;

		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.store.dispatch(startRegister());

		if (!controls['agree'].value) {
			this.store.dispatch(acceptTerms());
			return;
		}

		const user: UserInterface = {
			email: controls['email'].value,
			displayName: controls['displayName'].value,
			firstName: controls['firstName'].value,
			lastName: controls['lastName'].value,
			password: controls['password'].value
		};

		this.store.dispatch(register({ user }));

		/*	return authMessage({code: 'auth/register-success', color: 'success'});
					this.auth.register(user).then(() => {
				this.store.dispatch(registerSuccess()); /// { user }
				this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
				this.router.navigateByUrl('/auth/login').then(() => console.log('register successful'));
				this.loading = false;
			}).catch((error) => {
				console.log(error);
				// this.store.dispatch(authMessage({ error,  }))
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.SIGNUP.' + error.code), 'danger');
				this.loading = false;
			}); */
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
