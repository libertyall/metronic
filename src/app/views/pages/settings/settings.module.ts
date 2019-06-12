import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { ApplicationResolver } from './application.resolver';
import { RouterModule } from '@angular/router';
import { settingsRoutes } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared.module';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { SettingsCalendarsComponent } from './settings-calendars/settings-calendars.component';

@NgModule({
	imports: [
		MatButtonModule,
		MatTabsModule,
		RouterModule.forChild(settingsRoutes),
		SharedModule,
		TagInputModule
	],
	declarations: [
		SettingsComponent,
		SettingsCalendarsComponent
		/* SettingsComponent,
		SettingsSocialDataComponent,
		StaticPagesComponent,
		StaticPageFormComponent,
		SettingsMainComponent,
		SettingsMailingComponent,
		SettingsDowntimeComponent,
		SettingsUrlshorteningComponent,
		SettingsCalendarsComponent,
		SettingsRegistrationComponent,
		SettingsSocialSignInComponent,
		SettingsSocialNetworksComponent */
	],
	providers: [
		ApplicationResolver,
		/* ApplicationService,
		CategoryService,
		CategoryTypeService,
		UserService */
	]
})
export class SettingsModule {
}
