import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

export const sendContactFormToEmail = functions
  .region('europe-west1')
  .runWith({ memory: '1GB', timeoutSeconds: 25 })
  .https.onCall(async (data) => {

    const transporter = nodemailer.createTransport('SMTP', {
      host: 'mail.sfwinterbach.com',
      port: 465,
      secure: true,
      auth: {
        user: functions.config().mailer.email,
        pass: functions.config().mailer.password
      }
    });

    const fromName = 'Kontakt';
    const fromEmail = 'kontaktformular@sfwinterbach.com';
    const to = data.to;
    const text = data.text;

    const mailOptions = {
      from: fromName + ' <' + fromEmail + '>',
      to: to,
      subject: 'Anfrage auf sfwinterbach.com',
      text: text,
      html: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log(info);
    return info;
  });
