'use strict';

// firebase functions:config:set bitLy.access_token=XXXXXXXXXXXXX

import * as functions from 'firebase-functions';
// const BitLyClient = require('bitly');

// const bitLy = BitLyClient(functions.config().bitLy.access_token);

// Shorten URL written to /links/{linkID}.
export const bitLyShortenLink = functions
	.region('europe-west1')
	.runWith({ memory: '128MB', timeoutSeconds: 5 })
	.database.ref('/links/{linkID}').onCreate(async (snap) => {
		const originalUrl = snap.val();
		// const response = await bitLy.shorten(originalUrl);
		return snap.ref.set({
			original: originalUrl
			// short: response.data.url,
		});
	});
