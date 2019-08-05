import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
const moment = require('moment');


moment.locale('de');

const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const collectionString = 'team-of-the-month';
const now = moment();

export const teamOfTheMonth = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .pubsub.topic('team-of-the-month')
  .onPublish(async () => {

    try {
      const applicationsSnapshot = await admin.firestore().collection('applications')
        .where('isCurrentApplication', '==', true)
        .get();
      const currentApp = applicationsSnapshot.docs[0].data();

      const teamOfTheWeekMailing = currentApp.mailing.filter((mailing:any) => {
        return mailing.isActive && mailing.title === 'Mannschaft des Monats';
      });

      if (teamOfTheWeekMailing && teamOfTheWeekMailing.length > 0) {

        const teamsSnapshot = await admin.firestore().collection('teams').get();

        const sample = teamsSnapshot.docs[Math.floor(Math.random() * teamsSnapshot.size)];

        await admin.firestore().collection(collectionString)
          .doc(now.format('YYYY') + '-' + now.month())
          .create({
            assignedTeamId: sample.data().id,
            title: now.format('YYYY') + '-' + now.month()
          });

        const current = moment().add(1, 'month');

        const msg = {
          to: teamOfTheWeekMailing[0].emails,
          from: 'mitglieder@sfwinterbach.com',
          subject: 'Mannschaft des Monats ' + now.format('MM') + '.' + now.format('YYYY'),
          templateId: 'cd68a992-a76c-4b47-8dda-a7d9c68fd1b3',
          substitutionWrappers: ['{{', '}}'],
          substitutions: {
            adminName: 'Thomas',
            teamName: sample.data().title + ' (' + sample.data().subTitle + ')',
            monthString: current.month() + '.' + now.format('YYYY')
          }
        };
        return sgMail.send(msg);
      } else {
        console.warn('Kein Mail-Verteiler mit dem Namen "Mannschaft des Monats" gefunden');
        return true;
      }
    } catch (e) {
      console.error(e);
      return e;
    }
  });
