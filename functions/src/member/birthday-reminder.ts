import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { birthdayWishes } from './birthday-wishes';

const moment = require('moment');

moment.locale('de');

// Sengrid
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

const db = admin.firestore();

export const birthdayReminder = functions
  .region('europe-west1')
  .runWith({memory: '512MB', timeoutSeconds: 12}).pubsub

  .schedule('0 5 * * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {

    try {

      const monthDay = moment().format('MM-DD');
      const mailArray: any = [];

      const recipients: {
        email: string,
        firstName: string,
        lastName: string,
        age: number
      }[] = [];

      const appQuery = db.collection('applications').where('isCurrentApplication', '==', true);
      const applicationsSnapshot = await appQuery.get();
      const currentApp = applicationsSnapshot.docs[0].data();

      const memberQuery = db.collection('members').where('mainData.birthday.monthDay', '==', monthDay);
      const membersSnapshot = await memberQuery.get();

      let birthdayList = '<ul>';

      membersSnapshot.docs.forEach(function (doc) {
        const memberData = doc.data();

        const age = calculateAge(memberData.mainData.birthday.year, memberData.mainData.birthday.month, memberData.mainData.birthday.day);

        if (memberData.contact && memberData.contact.email) {
          const data = {
            email: memberData.contact.email,
            firstName: memberData.mainData.firstName,
            lastName: memberData.mainData.lastName,
            age: age
          };
          recipients.push(data);
        }
        birthdayList += '<li>' + memberData.mainData.firstName + ' ' + memberData.mainData.lastName + ' wird heute ' + age + ' Jahre</li>';
      });

      // if no there are no birthdays today
      if (birthdayList === '<ul>') {
        birthdayList = '<li>Heute hat niemand Geburtstag.</li>';
      }

      birthdayList += '</ul>';

      const birthdayMailing = currentApp.mailing.filter((mailing:any) => {
        return mailing.isActive && mailing.title === 'Geburtstagsgrüße als Kopie';
      });

      if (birthdayMailing && birthdayMailing.length > 0) {


        if (membersSnapshot.size > 0 && recipients.length === 0) {
          const text = 'Es wurden keine Email Adressen der Geburtstagskinder hinterlegt.';
          console.warn(text);
          birthdayList += '<p>' + text + '</p>';
          const mail: any = {
            to: birthdayMailing[0].emails,
            from: 'Geburtstage@sfwinterbach.com',
            subject: 'Geburtstage vom ' + moment().format('LL'),
            templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              adminName: '',
              birthdayList: birthdayList,
              dateString: moment().format('LL')
            }
          };
          mailArray.push(sgMail.send(mail));
        } else {

          mailArray.push(sgMail.send({
            to: birthdayMailing[0].emails,
            from: 'Geburtstage@sfwinterbach.com',
            subject: 'Geburtstage vom ' + moment().format('LL'),
            templateId: '3b21edd6-0c49-40c2-a2e3-68ae679ff440',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              adminName: '',
              birthdayList: birthdayList,
              dateString: moment().format('LL')
            }
          }));


          const bccList: string[] = [];
          console.log(recipients);
          recipients.forEach(recipient => {

            if (birthdayMailing[0].emails.indexOf(recipient.email) === -1) {
              bccList.push(recipient.email);
            }

            const birthdaySample = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];

            const mail: any = {
              to: recipient.email,
              bcc: bccList,
              from: 'Geburtstage@sfwinterbach.com',
              subject: 'Alles Gute zum Geburtstag!',
              templateId: '780bf24e-b085-4ece-9262-f727c47a3edc',
              substitutionWrappers: ['{{', '}}'],
              substitutions: {
                firstName: recipient.firstName,
                lastName: recipient.lastName,
                age: recipient.age,
                message: birthdaySample.message,
                author: birthdaySample.author
              }
            };
            mailArray.push(sgMail.send(mail));
          });
        }
      }
      return await Promise.all(mailArray);
    } catch (e) {
      console.error(e);
      return e;
    }

  });

function calculateAge(year: string, month: string, day: string) {
  const dateOfBirth = new Date(year + '-' + month + '-' + day);
  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
