import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { AuthService } from '../../../../core/auth/_services/auth.service';
import { AuthNoticeService } from '../../../../core/auth/auth-notice/auth-notice.service';
import { CredentialsLogin } from '../../../../core/auth/_actions/auth.actions';


@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>;

	constructor(private router: Router,
				private auth: AuthService,
				private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private store: Store<AppState>,
				private fb: FormBuilder) {
		this.unsubscribe = new Subject();
	}

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initLoginForm() {

		this.loginForm = this.fb.group({
			email: [ '', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			],
			password: [ '', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	submit() {
		const controls = this.loginForm.controls;
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls[ 'email' ].value,
			password: controls[ 'password' ].value
		};
		this.auth
			.login(authData.email, authData.password)
			.then((user) => {
				this.store.dispatch(new CredentialsLogin(authData.email, authData.password));
				this.router.navigateByUrl('/').then(() => console.log('navigate to dashboard'));
				this.loading = false;
			})
			.catch((error) => {
				console.log(error);
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				this.loading = false;
			});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[ controlName ];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
}
