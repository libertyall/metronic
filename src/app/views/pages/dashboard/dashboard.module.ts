import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { MatDividerModule, MatListModule } from '@angular/material';
import { SharedModule } from '../shared.module';
import { SharedMediaModule } from '../../../shared/components/media/shared-media.module';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { WidgetModule } from '../../partials/content/widgets/widget.module';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		MatListModule,
		MatDividerModule,
		PortletModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		]),
		SharedModule,
		SharedMediaModule,
		WidgetModule
	],
	providers: [],
	declarations: [
		BirthdayListComponent,
		DashboardComponent
	]
})
export class DashboardModule {
}
