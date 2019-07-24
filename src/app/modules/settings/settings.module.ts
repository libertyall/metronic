import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { settingsRoutes } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {
	MatButtonModule,
	MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatRadioModule,
	MatSelectModule, MatTabsModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PortletModule } from '../../views/partials/content/general/portlet/portlet.module';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { TagInputModule } from 'ngx-chips';
import { PartialsModule } from '../../views/partials/partials.module';
import { SettingsLayoutComponent } from './settings-layout/settings-layout.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PanelWrapperComponent } from './settings-layout/panel-wrapper/panel-wrapper.component';
import {SettingsCalendarsComponent} from "./settings-calendars/settings-calendars.component";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {settingsReducer} from "./_reducers/settings.reducers";
import {SettingsEffects} from "./_effects/settings.effects";
import {SettingsMailingComponent} from "./settings-mailing/settings-mailing.component";
import { SettingsLinksComponent } from './settings-links/settings-links.component';

@NgModule({
	imports: [
		ColorPickerModule,
		CommonModule,
		FormlyModule.forRoot({
			wrappers: [
				{ name: 'panel', component: PanelWrapperComponent },
			],
		}),
		FormlyBootstrapModule,
		EffectsModule.forFeature([SettingsEffects]),
		StoreModule.forFeature('settings', settingsReducer),
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule, //
		MatInputModule,
		MatOptionModule,
		MatRadioModule,
		MatSelectModule,
		MatTabsModule,
		NgPipesModule,
		PartialsModule,
		PortletModule,
		ReactiveFormsModule,
		RouterModule.forChild(settingsRoutes),
		TranslateModule.forChild(),
		TagInputModule
		// SharedModule,
		// TagInputModule
	],
	declarations: [
		PanelWrapperComponent,
		SettingsComponent,
		SettingsMainComponent,
		SettingsLayoutComponent,
		SettingsMailingComponent,
		SettingsCalendarsComponent,
		SettingsLinksComponent
	],
	providers: [
		KeyValuePipe
		// ApplicationResolver,
		/* ApplicationService,
		 CategoryService,
		 CategoryTypeService,
		 UserService */
	]
})
export class SettingsModule {
}
