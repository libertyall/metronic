import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MatDividerModule, MatListModule} from '@angular/material';
import {BirthdayListComponent} from "./birthday-list/birthday-list.component";
import {PortletModule} from "../../views/partials/content/general/portlet/portlet.module";
import {WidgetModule} from "../../views/partials/content/widgets/widget.module";
import {CommonModule} from "@angular/common";
import { DashboardArticleListComponent } from './dashboard-article-list/dashboard-article-list.component';

@NgModule({
	imports: [
		CommonModule,
		// PartialsModule,
		// CoreModule,
		// NgbModule,
		MatListModule,
		MatDividerModule,
		PortletModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		]),
		WidgetModule
		// SharedModule,
		// SharedMediaModule,
	],
	providers: [
	],
	declarations: [
		BirthdayListComponent,
		DashboardComponent,
		DashboardArticleListComponent
	]
})
export class DashboardModule {
}
