import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../../../../core/auth/_interfaces/user.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Role } from '../../../../../core/auth/_interfaces/role.interface';
import { Address } from '../../../../../core/auth/_interfaces/address.interface';
import { SocialNetworks } from '../../../../../core/auth/_interfaces/social-networks.interface';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutConfigService, SubheaderService } from '../../../../../core/_base/layout';
import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { selectUserById, selectUsersActionLoading } from '../../../../../core/auth/_selectors/user.selectors';

@Component({
	selector: 'kt-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnDestroy {

	user: IUser;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<Role[]>([]);
	addressSubject = new BehaviorSubject<Address>({ addressLine: '', city: '', postCode: '', state: '' });
	socialNetworksSubject = new BehaviorSubject<SocialNetworks>({});
	private subscriptions: Subscription[] = [];


	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private userFB: FormBuilder,
				private subheaderService: SubheaderService,
				private layoutUtilsService: LayoutUtilsService,
				private store: Store<AppState>,
				private layoutConfigService: LayoutConfigService) {
	}


	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));

		const routeSubscription = this.activatedRoute.data.subscribe((data: { user: IUser }) => {
			this.user = data.user;
			this.initUser();
			console.log(data);
			this.rolesSubject.next(this.user.assignedRoles);
			this.addressSubject.next(this.user.address);
			this.socialNetworksSubject.next(this.user.socialNetworks);
			/* this.uploaderOptions.itemId = this.user.id;
			this.uploaderConfig.placeHolderImage =
				this.user.gender === 'female'
					? '/assets/sfw/placeholder/avatar_female.jpg'
					: '/assets/sfw/placeholder/avatar_male.jpg'; */
		});


		/* const routeSubscription = this.activatedRoute.params.subscribe(params => {
			console.log(params);
			if (params['id']) {
				console.log(params['id']);
				this.store.pipe(select(selectUserById(params['id']))).subscribe(res => {
					console.log(params['id']);
					if (res) {
						console.log(res);
						this.user = res;
						this.rolesSubject.next(this.user.assignedRoles);
						this.addressSubject.next(this.user.address);
						this.socialNetworksSubject.next(this.user.socialNetworks);
						this.initUser();
					}
				});
			}
		}); */
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	initUser(): void {
		this.subheaderService.setTitle('user.detail.title');
		this.subheaderService.setBreadcrumbs([
			{ title: 'user.detail.breadcrumb.module', page: `user-management` },
			{ title: 'user.detail.breadcrumb.main', page: `user-management/users` },
			{ title: 'user.detail.breadcrumb.sub', page: `user-management/users/add` }
		]);
		return;
	}

}
