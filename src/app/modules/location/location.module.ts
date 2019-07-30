import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationsComponent} from './locations/locations.component';
import {LocationFormComponent} from './location-form/location-form.component';
import {LocationDetailComponent} from './location-detail/location-detail.component';
import {LocationMapComponent} from './location-map/location-map.component';
import {LocationListComponent} from './location-list/location-list.component';
import {LocationRoutingModule} from './location-routing.module';
import {LocationResolver} from './location.resolver';
import {CategoriesResolver} from '../category/categories.resolver';
import {LocationDashboardComponent} from './location-dashboard/location-dashboard.component';
import {LocationsResolver} from './locations.resolver';
import {TranslateModule} from "@ngx-translate/core";
import {PortletModule} from "../../views/partials/content/general/portlet/portlet.module";
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgPipesModule} from "ngx-pipes";
import {EventEmitterService} from "../../shared/services/event-emitter.service";
import { TabsModule, WavesModule } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	declarations: [
		LocationsComponent,
		LocationFormComponent,
		LocationDetailComponent,
		LocationMapComponent,
		LocationListComponent,
		LocationDashboardComponent
	],
	imports: [
		AgmCoreModule,
		CommonModule,
		LocationRoutingModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatTabsModule,
		NgbDropdownModule,
		NgPipesModule,
		PortletModule,
		ReactiveFormsModule,
		TabsModule,
		TranslateModule.forChild(),
		WavesModule
	],
	providers: [
		EventEmitterService,
		CategoriesResolver,
		LocationResolver,
		LocationsResolver
	]
})
export class LocationModule {
}
