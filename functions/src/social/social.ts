const axios = require('axios');
const moment = require('moment');
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const social = functions.region('europe-west1').https.onRequest(async (req, res) => {

  const jobs: Promise<any>[] = [];

  // Query all open Articles from Firestore
  const articlesSnapshot = await db.collection('articles').get();

  // No open Articles?
  if (articlesSnapshot.empty) {
    console.log('No matching documents found');
  } else {

    // Loop over open Articles
    articlesSnapshot.forEach(doc => {
      const id = doc.id;

      // Marked as instant or scheduled post?
      if (doc.data().publicationStatus === 1 ||
        (doc.data().publicationAt.seconds < moment().unix() && doc.data().publicationStatus === 2)
      ) {

        // Post on Facebook
        if (doc.data().meta.facebook.scheduled) {
          const message = doc.data().meta.facebook.description;
          const job = axios.post('https://europe-west1-sportfreunde-winterbach.cloudfunctions.net/facebook', {
            id,
            message
          })
            .then((response:any) => {
              console.log('Successfully posted on Facebook', response.data);
            })
            .catch((error:any) => {
              console.log('Error, could not post on Facebook', error);
            });
          jobs.push(job);
        }

        // Post on Twitter
        if (doc.data().meta.twitter.scheduled) {
          const message = doc.data().meta.twitter.description;
          const job = axios.post('https://europe-west1-sportfreunde-winterbach.cloudfunctions.net/twitter', {
            id,
            message
          })
            .then((response:any) => {
              console.log('Successfully posted on Twitter', response.data);
            })
            .catch((error:any) => {
              console.log('Error, could not post on Twitter', error);
            });
          jobs.push(job);
        }
      }
    });
  }

  return await Promise.all(jobs);

});
