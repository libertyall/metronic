import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations/locations.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationStatisticsComponent } from './location-statistics/location-statistics.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationResolver } from './location.resolver';
import { CategoriesResolver } from '../category/categories.resolver';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';
import { LocationsResolver } from './locations.resolver';

@NgModule({
	declarations: [
		LocationsComponent,
		LocationFormComponent,
		LocationDetailComponent,
		LocationMapComponent,
		LocationStatisticsComponent,
		LocationListComponent,
		LocationDashboardComponent
	],
	imports: [
		CommonModule,
		LocationRoutingModule
	],
	providers: [
		CategoriesResolver,
		LocationResolver,
		LocationsResolver
	]
})
export class LocationModule {
}
