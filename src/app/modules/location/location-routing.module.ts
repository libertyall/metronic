import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';
import { LocationResolver } from './location.resolver';
import { LocationStatisticsComponent } from './location-statistics/location-statistics.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CategoriesResolver } from '../category/categories.resolver';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';
import { LocationsResolver } from './locations.resolver';

export const routes: Routes = [
	{
		path: '',
		component: LocationsComponent,
		resolve: {
			locations: LocationsResolver,
			categories: CategoriesResolver
		},
		children: [
			{
				path: 'dashboard',
				component: LocationDashboardComponent
			},
			{
				path: 'list',
				component: LocationListComponent
			},
			{
				path: 'edit/::locationId',
				component: LocationFormComponent
			},
			{
				path: 'create',
				component: LocationFormComponent
			},
			{
				path: 'detail/:locationId',
				component: LocationDetailComponent
			},
			{
				path: 'map',
				component: LocationMapComponent
			},
			{
				path: 'statistics',
				component: LocationStatisticsComponent,
				resolve: {}
			},
			{
				path: '**',
				redirectTo: 'dashboard'
			}
		]
	}
];

export const LocationRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
