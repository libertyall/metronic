import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubheaderService} from '../../../core/_base/layout';
import {Application} from "../_model/application.model";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {getCurrentApplication} from "../_selectors/settings.selectors";
import {loadCurrentApplication, saveApplication} from "../_actions/settings.actions";
import {credentialsLogin, startLogin} from "../../../core/auth/_actions/auth.actions";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

	selectedTab: number = 0;
	application$: Observable<Application>;
	hasFormErrors: boolean = false;

	constructor(private store: Store<AppState>,
				private subheaderService: SubheaderService) {
	}

	ngOnInit(): void {
		this.subheaderService.setTitle({
			title: 'settings.subheader.title',
			desc: 'settings.subheader.desc'
			// showToolbar: true
		});
		// this.loading$ = this.store.pipe(select(selectSettingsPageLoading));
		this.application$ = this.store.pipe(select(getCurrentApplication));
		this.store.dispatch(loadCurrentApplication());
	}

	onAlertClose(): void {
		this.hasFormErrors = false;
	}

	ngOnDestroy() {
		// this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	setFormErrors($event: boolean): void {
		this.hasFormErrors = $event;
	}

	saveApplication(application: Application) {

		this.store.dispatch(saveApplication({application}));

		/*this.application = Object.assign({}, this.application, application);
	 this.applicationService.updateApplication(application.id, application)
	 .then(() => {
	 // set Page Title
	 if (this.title.getTitle() !== application.page.title) {
	 this.title.setTitle(application.page.title);
	 }

	 this.alertService.showSnackBar('success', 'general.applications.updateMessage');
	 },
	 (error: any) => this.alertService.showSnackBar('error', error.message));*/
	}

}
