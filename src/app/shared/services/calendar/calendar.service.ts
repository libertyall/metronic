import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../application/application.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { ICalendarEvent } from '../../interfaces/calendar/calendar-event.interface';
import * as moment from 'moment';

@Injectable()
export class CalendarService {

	constructor(private httpClient: HttpClient,
				private applicationService: ApplicationService,
				private fns: AngularFireFunctions) {
	}

	public getCalendars(startDate?: string, endDate?: string): Observable<any> {
		const callable = this.fns.httpsCallable('googleCalendars');
		return callable({
			startDate: startDate,
			endDate: endDate
		});
	}

	public updateEvent(event): Observable<any> {
		const googleEvent: ICalendarEvent = {
			created: event.created,
			creator: {
				email: event.creator ? event.creator.email : '',
				displayName: event.creator ? event.creator.displayName : ''
			},
			end: event.end,
			etag: event.etag,
			htmlLink: event.htmlLink,
			iCalUID: event.iCalUID,
			id: event.id,
			kind: event.kind,
			location: event.location,
			organizer: {
				email: event.organizer ? event.organizer.email : '',
				displayName: event.organizer ? event.organizer.displayName : '',
				self: event.organizer ? event.organizer.self : false
			},
			sequence: event.sequence,
			start: event.start.dateTime ? event.start.dateTime : event.start,
			status: event.status,
			summary: event.summary,
			title: event.title,
			updated: event.updated
		};
		const callable = this.fns.httpsCallable('updateGoogleCalendar');
		return callable({ event: googleEvent });
	}

	getFormattedDate(dateString: string, format: string) {
		return moment(dateString).format(format);
	}

	getWeekday(dateString: string) {
		return moment.weekdays(moment(dateString).day());
	}

	getDateDiff(dateString: string, format: any) {
		console.log(dateString);
		console.log(format);
		const now = moment();
		return now.diff(dateString, format);
	}

}
