import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CronjobsComponent} from "./cronjobs/cronjobs.component";

export const cronJobRoutes: Routes = [
	{
		path: 'dashboard',
		component: CronjobsComponent
	},
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(cronJobRoutes)
	]
})
export class CronJobRoutingModule {
}
