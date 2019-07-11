import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
import {AuthService} from '../../../../core/auth/_services';
import {AuthNoticeService} from '../../../../core/auth/auth-notice/auth-notice.service';
import {
	credentialsLogin,
	facebookLogin,
	googleLogin,
	startLogin,
	twitterLogin
} from '../../../../core/auth/_actions/auth.actions';
import {UserInterface} from '../../../../core/auth/_interfaces/user.interface';
import {currentUser, isLoading, isLoggedIn} from '../../../../core/auth/_selectors/auth.selectors';

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;

	user$: Observable<UserInterface | null>;
	isLoggedIn$: Observable<boolean>;
	isLoading$: Observable<boolean>;

	private unsubscribe: Subject<any>;

	constructor(private router: Router,
				private auth: AuthService,
				private authNoticeService: AuthNoticeService,
				private translate: TranslateService,
				private store: Store<AppState>,
				private fb: FormBuilder) {
		this.unsubscribe = new Subject();
		this.isLoggedIn$ = this.store.select(isLoggedIn);
		this.user$ = this.store.select(currentUser);
		this.isLoading$ = this.store.select(isLoading);
	}

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	initLoginForm() {

		this.loginForm = this.fb.group({
			email: [
				'', Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320)
				])
			],
			password: [
				'', Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			],
			rememberMe: [true]
		});
	}

	submit() {
		const controls = this.loginForm.controls;
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.store.dispatch(startLogin());

		const authData = {
			email: controls['email'].value,
			password: controls['password'].value,
			rememberMe: controls['rememberMe'].value
		};

		this.store.dispatch(credentialsLogin(authData));

		/* this.auth
			.doLoginWithCredentials(authData)
			.then(() => {
				this.store.dispatch(credentialsLogin({ email: authData.email, password: authData.password, rememberMe: authData.rememberMe }));
				this.router.navigateByUrl('/').then(() => console.log('navigate to dashboard'));
				this.loading = false;
			})
			.catch((error) => {
				this.store.dispatch(authMessage(error));
				this.authNoticeService.setNotice(this.translate.instant('AUTH.ERRORS.' + error.code), 'danger');
				this.loading = false;
			}); */
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}

	googleLogin(): void {
		this.store.dispatch(googleLogin());
	}

	facebookLogin(): void {
		this.store.dispatch(facebookLogin());
	}

	twitterLogin(): void {
		this.store.dispatch(twitterLogin());
	}

}
