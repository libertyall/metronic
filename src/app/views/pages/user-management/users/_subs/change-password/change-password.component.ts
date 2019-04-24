import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../../core/reducers';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { IUser } from '../../../../../../core/auth/_interfaces/user.interface';
import { AuthService } from '../../../../../../core/auth/_services/auth.service';
import { UserUpdated } from '../../../../../../core/auth/_actions/user.actions';

export class PasswordValidation {

	static MatchPassword(AC: AbstractControl) {
		const password = AC.get('password').value;
		const confirmPassword = AC.get('confirmPassword').value;
		if (password !== confirmPassword) {
			AC.get('confirmPassword').setErrors({ MatchPassword: true });
		} else {
			return null;
		}
	}
}

@Component({
	selector: 'kt-change-password',
	templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

	@Input() userId: string;
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	hasFormErrors: boolean = false;
	user: IUser;
	changePasswordForm: FormGroup;
	viewLoading = true;

	constructor(private fb: FormBuilder, private auth: AuthService,
				private store: Store<AppState>,
				private layoutUtilsService: LayoutUtilsService) {
	}

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this.auth.getUserById(this.userId).subscribe(res => {
			this.user = res;
			this.createForm();
		});
	}

	createForm() {
		this.changePasswordForm = this.fb.group({
			password: [ '', Validators.required ],
			confirmPassword: [ '', Validators.required ]
		});
	}

	reset() {
		this.hasFormErrors = false;
		this.loadingSubject.next(false);
		this.changePasswordForm.markAsPristine();
		this.changePasswordForm.markAsUntouched();
		this.changePasswordForm.updateValueAndValidity();
	}

	onSubmit() {
		this.loadingSubject.next(true);
		this.hasFormErrors = false;
		const controls = this.changePasswordForm.controls;
		if (this.changePasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[ controlName ].markAsTouched()
			);
			this.hasFormErrors = true;
			this.loadingSubject.next(false);

			return;
		}

		this.user.password = controls[ 'password' ].value;
		const updatedUser: Update<IUser> = {
			id: this.user.id,
			changes: this.user
		};

		this.store.dispatch(new UserUpdated({
			partialUser: updatedUser,
			user: this.user
		}));

		this.loadData();
		this.loadingSubject.next(false);
		const message = `User password successfully has been changed.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, false);
		this.reset();
	}

	onAlertClose() {
		this.hasFormErrors = false;
	}
}
