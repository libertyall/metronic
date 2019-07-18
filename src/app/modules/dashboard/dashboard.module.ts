import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MatDividerModule, MatListModule} from '@angular/material';
import {BirthdayListComponent} from "./birthday-list/birthday-list.component";

@NgModule({
	imports: [
		// CommonModule,
		// PartialsModule,
		// CoreModule,
		// NgbModule,
		MatListModule,
		MatDividerModule,
		// PortletModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		]),
		// SharedModule,
		// SharedMediaModule,
		// WidgetModule
	],
	providers: [],
	declarations: [
		BirthdayListComponent,
		DashboardComponent
	]
})
export class DashboardModule {
}
