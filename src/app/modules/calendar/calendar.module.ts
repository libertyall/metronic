import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdbCalendarModule} from "mdb-calendar";
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";

@NgModule({
	declarations: [
		CalendarComponent
	],
	imports: [
		CalendarRoutingModule,
		CommonModule,
		MdbCalendarModule
	]
})
export class CalendarModule {
}
