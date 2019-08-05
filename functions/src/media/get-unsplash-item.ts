import * as functions from 'firebase-functions';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
const rp = require('request-promise');

const env = functions.config();

export const getUnSplashItem = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .https.onRequest(async (req, res) => {

    if (!req.query.url) {
      res.status(300).send('no url');
    }

    const options = {
      uri: req.query.url + '?client_id=' + env.unsplash.appId
    };

    rp(options).then((response:any) => {

      const stream = require('stream');
      const bufferStream = new stream.PassThrough();

      bufferStream.end(Buffer.from(response.body, 'base64'));

      const file = admin.storage().bucket().file('name.jpg');

      bufferStream.pipe(
        file.createWriteStream({
          public: true
        }))
        .on('error', function(error:any) {
          console.log(error);
          return res.status(500).send(error);
        })
        .on('finish', function() {

          const config: GetSignedUrlConfig = {
            action: 'read',
            expires: '01-01-2025'
          };
          file.getSignedUrl(config, function(error, url) {
            console.log(url);
            if (error) {
              return res.status(500).send(error);
            }
            return res.status(500).send(url);
          });

        });

      res.send('Success');
    })
      .catch((err:any) => {
        res.status(500).send('Error:' + err.message);
      });

  });
