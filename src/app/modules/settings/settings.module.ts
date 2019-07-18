import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {settingsRoutes} from './settings-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {
	MatCheckboxModule,
	MatFormFieldModule, MatIconModule, MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatTabsModule, MatTreeModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {PortletModule} from '../../views/partials/content/general/portlet/portlet.module';
import {SettingsMainComponent} from './settings/settings-main/settings-main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule, KeyValuePipe} from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import {TagInputModule} from "ngx-chips";
import {PartialsModule} from "../../views/partials/partials.module";
import { SettingsLayoutComponent } from './settings/settings-layout/settings-layout.component';
import {TreeService} from "./services/tree.service";

@NgModule({
	imports: [
		CommonModule,
		// MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule, //
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatTabsModule,
		MatTreeModule,
		NgPipesModule,
		PartialsModule,
		PortletModule,
		ReactiveFormsModule,
		RouterModule.forChild(settingsRoutes),
		TranslateModule.forChild(),
		TagInputModule,
		// SharedModule,
		// TagInputModule
	],
	declarations: [
		SettingsComponent,
		SettingsMainComponent,
		SettingsLayoutComponent,
		// SettingsCalendarsComponent
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
		KeyValuePipe,
		TreeService
		// ApplicationResolver,
		/* ApplicationService,
		CategoryService,
		CategoryTypeService,
		UserService */
	]
})
export class SettingsModule {
}
