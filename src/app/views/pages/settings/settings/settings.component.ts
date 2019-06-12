import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutConfigService, SubheaderService } from '../../../../core/_base/layout';
import { select, Store } from '@ngrx/store';
import { selectUsersActionLoading } from '../../../../core/auth/_selectors/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutUtilsService } from '../../../../core/_base/crud';
import { AppState } from '../../../../core/reducers';
import { Observable, Subscription } from 'rxjs';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import { selectApplicationById } from '../../../../core/application/selectors/application.selectors';

/* import { IApplication } from '../../../shared/interfaces/application.interface';
 import { ApplicationService } from '../../../shared/services/application/application.service';
 import { TranslateService } from '@ngx-translate/core';
 import { CategoryService } from '../../../shared/services/category/category.service';
 import { ICategory } from '../../../shared/interfaces/category.interface';
 import { Observable } from 'rxjs';
 import { AlertService } from '../../../shared/services/alert/alert.service'; */

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

	@Input() application: IApplication;
	oldApplication: IApplication;
	selectedTab: number = 0;
	loading$: Observable<boolean>;
	form: FormGroup;
	hasFormErrors: boolean = false;
	private subscriptions: Subscription[] = [];

	constructor(private activatedRoute: ActivatedRoute,
				private router: Router,
				private userFB: FormBuilder,
				private layoutUtilsService: LayoutUtilsService,
				private store: Store<AppState>,
				private layoutConfigService: LayoutConfigService,
				private subheaderService: SubheaderService) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle({
			title: 'settings.subheader.title',
			desc: 'settings.subheader.desc'
		});

		this.loading$ = this.store.pipe(select(selectUsersActionLoading));

		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params['id'];
			if (id && id > 0) {
				this.store.pipe(select(selectApplicationById(id))).subscribe(res => {
					if (res) {
						this.application = res;
						this.oldApplication = Object.assign({}, this.application);
					}
				});
			} else {
				this.application = {
					isCurrentApplication: true,
					urlShortening: null,
					page: {
						title: '',
						description: '',
						email: '',
						isEnabled: false,
						name: ''
					},
					registration: '',
					downtime: {
						isEnabled: false,
						message: ''
					}
				};

				this.oldApplication = Object.assign({}, this.application);
				this.initApplication();
			}
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	initApplication() {
		this.createForm();
		if (!this.application.id) {
			this.subheaderService.setTitle('settings.createTitle');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Users', page: `user-management/users` },
				{ title: 'Create user', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('settings.editTitle');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users', page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.application.id } }
		]);
	}

	createForm() {
		this.form = this.userFB.group({});
	}

	/* public application: IApplication;
	 public form: FormGroup;

	 public categories$: Observable<ICategory[]>;

	 constructor(private fb: FormBuilder,
	 private route: ActivatedRoute,
	 public alertService: AlertService,
	 private title: Title,
	 private translateService: TranslateService,
	 private categoryService: CategoryService,
	 private applicationService: ApplicationService) {
	 this.categories$ = categoryService.getCategoriesByCategoryType('static.types');
	 }

	 ngOnInit() {
	 this.route.data.subscribe((data: { application: IApplication }) => {
	 this.application = data.application;
	 });
	 }

	 saveApplication(application: IApplication) {
	 this.application = Object.assign({}, this.application, application);
	 this.applicationService.updateApplication(application.id, application)
	 .then(() => {
	 // set Page Title
	 if (this.title.getTitle() !== application.page.title) {
	 this.title.setTitle(application.page.title);
	 }

	 this.alertService.showSnackBar('success', 'general.applications.updateMessage');
	 },
	 (error: any) => this.alertService.showSnackBar('error', error.message));
	 } */

}
