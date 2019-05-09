import { NgModule } from '@angular/core';
import { sfwCalendarRoutes } from './sfw-calendar-routing.module';
import { RouterModule } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import {
	MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule,
	MatNativeDateModule
} from '@angular/material';
import { EventAddComponent } from './event-add/event-add.component';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { SharedModule } from '../shared.module';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { CalendarService } from '../../../shared/services/calendar/calendar.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
	imports: [
		AngularFireFunctionsModule,
		FullCalendarModule,
		MatButtonModule,
		MatDatepickerModule,
		MatDialogModule,
		OwlDateTimeModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatInputModule,
		MatNativeDateModule,
		OwlMomentDateTimeModule,
		RouterModule.forChild(sfwCalendarRoutes),
		SharedModule
	],
	declarations: [
		CalendarDashboardComponent,
		EventAddComponent
	],
	entryComponents: [
		EventAddComponent
	],
	providers: [
		ApplicationService,
		CalendarService,
		MemberService,
		{
			provide: FunctionsRegionToken,
			useValue: 'europe-west1'
		}
	]
})

export class SFWCalendarModule {
}
