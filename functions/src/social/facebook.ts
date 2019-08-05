import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
const db = admin.firestore();
const request = require('request-promise');

export const facebook = functions.region('europe-west1').https.onRequest((req, res) => {
  // return cors(req, res, () => {

  // General, Page & Access Data
  const articleId = req.body.id;
  const pageId = '1188810447962053';
  const access_token = 'EAAGI2Mtrq3MBAEIpdKFyZA1kQepUgE61r6ZCRboIvStHik1FXVHTyZCHUZA62pqUjwYgg3wOvcOfQMCrpjnElMdBwEYOcDRYEAYfzoyt1e2Jo4hQZCN2pLSGL1Ed2pZBT4PGB8K84Ag7NHD2dZA0Yl4f5VEvV1kPO0lBTZCjZBGCdYhMAIXZC0SGlNBDZCFEh4QSBQZD';

  // Data for facebook Post
  const postMessage = req.body.message;

  // 1 - Post on Facebook (Post to Graph API)
  // 2 - Update Firestore data on success & send response
  // 3 - Send error response on fail
  const postToFacebook = {
    method: 'POST',
    uri: `https://graph.facebook.com/${pageId}/feed`,
    qs: {
      access_token: access_token,
      message: postMessage
    }
  };

  return request(postToFacebook)
    .then((response:any) => {
      const result = JSON.parse(response);
      return db.collection('articles').doc(articleId).set({
        'publicationStatus': 3,
        'meta': {
          'facebook': {
            'postId': result.id
          }
        }
      },
        { merge: true })
        .then(() => {
          res.status(200).send(response);
        });
    })
    .catch((error:any) => {
      res.status(400).send(error);
    });

  // })
});
