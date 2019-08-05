import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const moment = require('moment');
const { google } = require('googleapis');

const GOOGLE_API_KEY = functions.config().google.calendar.key;
const getCalendar = google.calendar({ version: 'v3', auth: GOOGLE_API_KEY });

const db = admin.firestore();

export const getGoogleCalendars = functions
	.region('europe-west1')
	.runWith({ memory: '1GB', timeoutSeconds: 25 })
	.https.onRequest(async (req, res) => {

		res.set('Access-Control-Allow-Origin', '*');

		if (req.method === 'OPTIONS') {
			res.header('Access-Control-Allow-Headers', 'Authorization, content-type');
			res.header('Access-Control-Max-Age', '7200');
		}

		const timeMin = req.body.data && req.body.data.startDate ? req.body.data.startDate : moment().startOf('month').toISOString();
		const timeMax = req.body.data && req.body.data.endDate ? req.body.data.endDate : moment().endOf('month').toISOString();

		console.log(timeMin);
		console.log(timeMax);

		try {
			const eventList: any[] = [];

			const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/calendar'] });
			const appSnapshot = await db.collection('applications').where('isCurrentApplication', '==', true).get();

			if (appSnapshot.size === 0) {

				return res.send({ data: eventList });

			} else {

				for (const cal of appSnapshot.docs[0].data().assignedCalendars) {
					if (cal.isActive) {

						const result = await getCalendar.events.list({
							auth: auth,
							calendarId: cal.link,
							timeMin: timeMin,
							timeMax: timeMax,
							// maxResults: 100,
							singleEvents: true,
							orderBy: 'startTime'
						});

						const events = result.data.items;

						if (events) {
							for (const event of events) {
								eventList.push({
									id: event.id,
									title: event.summary,
									location: event.location,
									created: event.created,
									creator: {
										email: event.creator.email,
										displayName: event.creator.displayName
									},
									description: event.description,
									htmlLink: event.htmlLink,
									start: event.start.dateTime || event.start.date,
									end: event.end.dateTime || event.end.date,
									color: cal.cssTitle,
									etag: event.etag,
									iCalUID: cal.link,
									summary: event.summary,
									status: event.status,
									kind: event.kind,
									email: event.email,
									updated: event.updated,
									sequence: event.sequence,
									organizer: {
										email: event.organizer ? event.organizer.email : '',
										displayName: event.organizer ? event.organizer.displayName : '',
										self: event.organizer ? event.organizer.self : false
									}
								});
							}
						}
					}
				}

				eventList.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

				return res.send({
					data: eventList
				});
			}
		}
		catch (e) {
			console.log(e);
			return res.send(e.message);
		}

	});
