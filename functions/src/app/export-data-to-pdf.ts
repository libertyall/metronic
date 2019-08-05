import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { join } from 'path';
import { tmpdir } from 'os';

// const Storage = require('@google-cloud/storage');

// const os = require('os');
const fs = require('fs-extra');
// const path = require('path');
// const json2csv = require('json2csv');
// const mkdirp = require('mkdirp');

export const  exportDataToPdf = functions
  .region('europe-west1')
  .runWith({ memory: '1GB', timeoutSeconds: 30 })
  .firestore.document('/reports/{reportId}')
  .onCreate(async (snapshot, context) => {

    try {

      // const bucketName = admin.storage().bucket().name;
      /* const gcs = new Storage({
        bucketName
      }); */

      const reportId = context.params.reportId;

      const db = admin.firestore();
      const reportRef = db.collection('reports').doc(reportId);

      const reportSnapshot = await reportRef.get();
      const data = reportSnapshot.data();

      // @ts-ignore
		const fileName = `reports/${data.type}/${reportId}.xslx`;

      const destination = join(tmpdir(), 'exports');
      const tempFilePath = join(destination, fileName);

      await fs.ensureDir(tempFilePath);

      console.log(`Writing out to ${tempFilePath}`);
      fs.writeFileSync(tempFilePath, 'something!');

      return admin.storage().bucket()
        .upload(tempFilePath, { destination })
        .then(() => fs.unlinkSync(tempFilePath))
        .catch(err => console.error('ERROR inside upload: ', err));

      /*
        const contentListSnapshot = await db.collection(data.type).get();

        const contentData = [];
        contentListSnapshot.docs.forEach((doc) => {
          contentData.push(doc.data());
        });

        try {
          // await file.createWriteStream().write(Buffer.from(contentData));
          return await reportRef.update({ status: 'complete' });

        } catch (e) {
          console.log(e);
        } */

    } catch (e) {
      console.log(e);
      return e;
    }

  });

