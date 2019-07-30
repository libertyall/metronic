import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {AnalyticsComponent} from "./analytics/analytics.component";

export const analyticsRoutes: Routes = [
	{
		path: 'dashboard',
		component: AnalyticsComponent
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(analyticsRoutes)
	]
})
export class AnalyticsRoutingModule {
}
