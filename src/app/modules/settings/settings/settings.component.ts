import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

	selectedTab: number = 0;

	/* @Input() application: IApplication;
	 oldApplication: IApplication;
	 loading$: Observable<boolean>;
	 private subscriptions: Subscription[] = [];*/

	constructor(private subheaderService: SubheaderService) {
	}

	ngOnInit(): void {

		this.subheaderService.setTitle({
			title: 'settings.subheader.title',
			desc: 'settings.subheader.desc'
			// showToolbar: true
		});
		// this.loading$ = this.store.pipe(select(selectApplicationActionLoading));

		/* const routeSubscription = this.activatedRoute.params.subscribe(params => {
		 const id = params['id'];
		 console.log(id);
		 if (id && id > 0) {
		 this.store.pipe(select(selectApplicationById(id))).subscribe(res => {
		 if (res) {
		 console.log(res);
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
		 this.subscriptions.push(routeSubscription);*/
	}

	ngOnDestroy() {
		// this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/*
	 initApplication() {
	 this.createForm();
	 if (!this.application.id) {
	 this.subheaderService.setTitle('settings.createTitle');
	 this.subheaderService.setBreadcrumbs([
	 {title: 'User Management', page: `user-management`},
	 {title: 'Users', page: `user-management/users`},
	 {title: 'Create user', page: `user-management/users/add`}
	 ]);
	 return;
	 }
	 this.subheaderService.setTitle('settings.editTitle');
	 this.subheaderService.setBreadcrumbs([
	 {title: 'User Management', page: `user-management`},
	 {title: 'Users', page: `user-management/users`},
	 {title: 'Edit user', page: `user-management/users/edit`, queryParams: {id: this.application.id}}
	 ]);
	 }

	 createForm() {
	 this.form = this.fb.group({});
	 }

	 /* public application: IApplication;
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
