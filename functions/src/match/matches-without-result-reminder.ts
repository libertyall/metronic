import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();

const moment = require('moment');
moment.locale('de');

export const matchesWithoutResult = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 12 }).pubsub

  .schedule('0 5 * * *').onRun(async context => {

    const now = admin.firestore.Timestamp.now();

    const matchesQuery = db.collection('matches').where('matchEndDate', '<=', now);
    const matchesSnapshot = await matchesQuery.get();
    console.log(matchesSnapshot.docs[0].data());
    return true;

  });
