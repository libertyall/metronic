import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
import { LayoutConfigService, SubheaderService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { selectLastCreatedUserId, selectUsersActionLoading } from '../../../../../core/auth/_selectors/user.selectors';
import { SocialNetworks } from '../../../../../core/auth/_interfaces/social-networks.interface';
import { Address } from '../../../../../core/auth/_interfaces/address.interface';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { UserOnServerCreated, UserUpdated } from '../../../../../core/auth/_actions/user.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {

	user: IUser;
	oldUser: IUser;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<Role[]>([]);
	addressSubject = new BehaviorSubject<Address>({ addressLine: '', city: '', postCode: '', state: '' });
	socialNetworksSubject = new BehaviorSubject<SocialNetworks>({});
	userForm: FormGroup;
	hasFormErrors: boolean = false;
	private subscriptions: Subscription[] = [];


	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private userFB: FormBuilder,
				private subheaderService: SubheaderService,
				private layoutUtilsService: LayoutUtilsService,
				private translate: TranslateService,
				private store: Store<AppState>,
				private layoutConfigService: LayoutConfigService) {
	}


	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));

		const routeSubscription = this.activatedRoute.data.subscribe((data: { user: IUser }) => {
			if (data.user) {
				this.user = this.oldUser = data.user;
				this.initUser();
				this.rolesSubject.next(this.user.assignedRoles);
				this.addressSubject.next(this.user.address);
				this.socialNetworksSubject.next(this.user.socialNetworks);
			} else {
				this.user = {
					email: '',
					displayName: '',
					firstName: '',
					lastName: '',
					photoURL: '',
					phoneNumber: '',
					id: '',
					assignedRoles: [],
					providerId: 'password'
				};

				this.rolesSubject.next(this.user.assignedRoles);
				this.addressSubject.next(this.user.address);
				this.socialNetworksSubject.next(this.user.socialNetworks);
				this.oldUser = Object.assign({}, this.user);
				this.initUser();
			}
		});

		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	initUser() {
		this.createForm();
		if (!this.user.id) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Users', page: `user-management/users` },
				{ title: 'Create user', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users', page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.user.id } }
		]);
	}

	createForm() {
		this.userForm = this.userFB.group({
			displayName: [this.user.displayName, Validators.required],
			firstName: [this.user.firstName, Validators.required],
			lastName: [this.user.lastName, Validators.required],
			email: [this.user.email, Validators.email],
			phoneNumber: [this.user.phoneNumber]
		});
	}

	goBackWithId() {
		this.router.navigateByUrl('/users/list').then();
	}

	/* refreshUser(userId: string = '') {
		let url = this.router.url;
		if (userId === '') {
			return this.router.navigate([url], { relativeTo: this.activatedRoute }).then(() => console.log('create user'));
		}
		url = `${ this.layoutConfigService.getCurrentMainRoute() }/user-management/users/edit/${ userId }`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then(() => console.log('edit user'));
	} */

	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
		this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}

	onSubmit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		if (editedUser.id !== '') {
			this.updateUser(editedUser, withBack);
			return;
		}

		this.addUser(editedUser, withBack);
	}

	prepareUser(): IUser {
		const controls = this.userForm.controls;
		return {
			address: this.addressSubject.value,
			socialNetworks: this.socialNetworksSubject.value,
			id: this.user.id,
			email: controls['email'].value,
			firstName: controls['firstName'].value,
			lastName: controls['lastName'].value,
			displayName: controls['displayName'].value,
			password: this.user.password,
			phoneNumber: '',
			photoURL: '',
			providerId: 'password'
		};
	}

	addUser(_user: IUser, withBack: boolean = false) {
		this.store.dispatch(new UserOnServerCreated({ user: _user }));
		const addSubscription = this.store.pipe(select(selectLastCreatedUserId)).subscribe(userId => {
			const message = `New user successfully has been added.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
			if (userId) {
				if (withBack) {
					this.goBackWithId();
				// } else {
				// 	this.refreshUser(userId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
	}

	updateUser(_user: IUser, withBack: boolean = false) {
		const updatedUser: Update<IUser> = {
			id: _user.id,
			changes: _user
		};
		this.store.dispatch(new UserUpdated({ partialUser: updatedUser, user: _user }));
		const message = `User successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
		if (withBack) {
			this.goBackWithId();
		// } else {
		// 	this.refreshUser(_user.id);
		}
	}

	getComponentTitle() {
		if (!this.user || !this.user.id) {
			return this.translate.instant('user.edit.page.title.create');
		}

		return this.translate.instant('user.edit.page.title.edit') + ` - ${ this.user.firstName } ${ this.user.lastName } (${ this.user.displayName })`;
	}

	onAlertClose() {
		this.hasFormErrors = false;
	}
}
