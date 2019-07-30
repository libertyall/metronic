import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CronjobsComponent} from './cronjobs/cronjobs.component';
import {CronJobRoutingModule} from "./cronjob-routing.module";


@NgModule({
	declarations: [CronjobsComponent],
	imports: [
		CommonModule,
		CronJobRoutingModule
	]
})
export class CronJobModule {
}
