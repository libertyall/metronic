import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { settingsRoutingModule } from './settings-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from '../../../shared/services/application.service';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { SettingsCalendarsComponent } from './settings/settings-calendars/settings-calendars.component';
import { SettingsDowntimeComponent } from './settings/settings-downtime/settings-downtime.component';
import { SettingsRegistrationComponent } from './settings/settings-registration/settings-registration.component';
import { SettingsSocialDataComponent } from './settings/settings-social-data/settings-social-data.component';
import { StaticPagesComponent } from './settings/static-pages/static-pages.component';
import { StaticPageFormComponent } from './settings/static-pages/static-page-form/static-page-form.component';
import { SettingsMailingComponent } from './settings/settings-mailing/settings-mailing.component';
import { SettingsUrlshorteningComponent } from './settings/settings-urlshortening/settings-urlshortening.component';
import { SettingsSocialSignInComponent } from './settings/settings-social-sign-in/settings-social-sign-in.component';
import { SettingsSocialNetworksComponent } from './settings/settings-social-networks/settings-social-networks.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {
	MatButtonModule,
	MatCardModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
	MatSelectModule,
	MatTabsModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { SettingsLayoutComponent } from './settings/settings-layout/settings-layout.component';
import { LayoutConfigTreeComponent } from './settings/settings-layout/layout-config-tree/layout-config-tree.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
	imports: [
		CommonModule,
		settingsRoutingModule,
		SharedModule,
		// FroalaEditorModule,
		// FroalaViewModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatSelectModule,
		MatTabsModule,
		NgPipesModule,
		TagInputModule
	],
	declarations: [
		SettingsComponent,
		SettingsMainComponent,
		SettingsCalendarsComponent,
		SettingsDowntimeComponent,
		SettingsRegistrationComponent,
		SettingsSocialDataComponent,
		StaticPagesComponent,
		StaticPageFormComponent,
		SettingsMainComponent,
		SettingsMailingComponent,
		SettingsUrlshorteningComponent,
		SettingsSocialSignInComponent,
		SettingsSocialNetworksComponent,
		SettingsLayoutComponent,
		LayoutConfigTreeComponent
	],
	providers: [
		ApplicationResolver,
		ApplicationService
		// CategoryService,
		// CategoryTypeService,
		// UserService
	]
})
export class SettingsModule {
}
