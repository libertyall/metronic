import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { Title } from '@angular/platform-browser';
import { ApplicationService } from '../../../../shared/services/application.service';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

	application: IApplication;
	form: FormGroup;
	categories$: Observable<ICategory[]>;

	constructor(private title: Title,
				private route: ActivatedRoute,
				private applicationService: ApplicationService) {
	}

	/*
	 constructor(private fb: FormBuilder,

	 public alertService: AlertService,
	 private translateService: TranslateService,
	 private categoryService: CategoryService,) {
	 this.categories$ = categoryService.getCategoriesByCategoryType('static.types');
	 }
	 */
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

					// this.alertService.showSnackBar('success', 'general.applications.updateMessage');
				}
				// (error: any) => this.alertService.showSnackBar('error', error.message)
			);
	}
}
