import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventAddComponent } from '../event-add/event-add.component';
import { CalendarService } from '../../../../shared/services/calendar/calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ICalendarEvent } from '../../../../shared/interfaces/calendar/calendar-event.interface';
import { Observable } from 'rxjs';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'calendar-dashboard',
	templateUrl: './calendar-dashboard.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'calendar-dashboard.component.scss'
	]
})
export class CalendarDashboardComponent implements OnInit {

	calendarPlugins = [dayGridPlugin];
	events: Observable<ICalendarEvent[]>;

	constructor(public calendarService: CalendarService,
				public dialog: MatDialog) {
	}

	/* @ViewChild(OwlCalendarComponent) ucCalendar;
	 @Input() events: ICalendarEvent[];
	 public calendarOptions; */

	ngOnInit() {
		this.calendarService.getCalendars().subscribe(data => {
			this.events = data;
		});
	}

	clickButton(model: any) {
		console.log(model);
	}

	eventClick($event: any) {
		const dialogRef = this.dialog.open(EventAddComponent, {
			hasBackdrop: true,
			data: {
				event: $event.detail ? $event.detail.event : null
			}
		});

		dialogRef.afterClosed().subscribe((data: any) => {
			if (data) {
				this.calendarService.updateEvent(data).subscribe(
					(t: any) => console.log(t),
					(error: any) => console.log(error)
				);
			}
		});
	}

}
