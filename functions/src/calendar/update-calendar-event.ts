const { google } = require('googleapis');
const calendar = google.calendar('v3');
import * as functions from 'firebase-functions';

const ERROR_RESPONSE = {
	status: '500',
	message: 'There was an error adding an event to your Google calendar'
};
const TIME_ZONE = 'EST';

export const updateCalendarEvent = functions.region('europe-west1')
	.runWith({ memory: '1GB', timeoutSeconds: 25 })
	.https.onRequest(async (request, response) => {

		console.log(request.body);

		const event = {
			eventName: request.body.eventName,
			description: request.body.description,
			startTime: request.body.startTime,
			endTime: request.body.endTime
		};

		const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/calendar'] });

		try {
			const data = await calendar.events.patch({
				auth: auth,
				calendarId: 'primary',
				resource: {
					'summary': event.eventName,
					'description': event.description,
					'start': {
						'dateTime': event.startTime,
						'timeZone': TIME_ZONE
					},
					'end': {
						'dateTime': event.endTime,
						'timeZone': TIME_ZONE
					}
				}
			});

			response.status(200).send({
				data: [data, event]
			});

		}
		catch (e) {
			console.error('Error adding event: ' + e.message);
			response.status(500).send(ERROR_RESPONSE);
		}

	});
