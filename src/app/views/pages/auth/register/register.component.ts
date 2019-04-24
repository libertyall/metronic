import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { AuthService } from '../../../../core/auth/_services/auth.service';
import { IUser } from '../../../../core/auth/_interfaces/user.interface';
import { Register } from '../../../../core/auth/_actions/auth.actions';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>;

	constructor(private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private router: Router,
				private auth: AuthService,
				private store: Store<AppState>,
				private fb: FormBuilder) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.initRegisterForm();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initRegisterForm() {
		this.registerForm = this.fb.group({
			lastName: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			firstName: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			email: [ '', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			]),
			],
			displayName: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			password: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			agree: [ false, Validators.compose([ Validators.required ]) ]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}


	submit() {
		const controls = this.registerForm.controls;

		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			return;
		}

		this.loading = true;

		if (!controls[ 'agree' ].value) {
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}

		const _user: IUser = {
			email: controls[ 'email' ].value,
			displayName: controls[ 'displayName' ].value,
			firstName: controls[ 'firstName' ].value,
			lastName: controls[ 'lastName' ].value,
			password: controls[ 'password' ].value,
			assignedRoles: [],
			lastSignInTime: null
		};
		this.auth.register(_user).then(() => {
			this.store.dispatch(new Register());
			// pass notice message to the login page
			this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
			this.router.navigateByUrl('/auth/login').then(() => console.log('register successful'));
			this.loading = false;
		}).catch((error) => {
			console.log(error);
			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
			this.loading = false;
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[ controlName ];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
