/* import * as functions from 'firebase-functions';
import * as sharp from 'sharp';
import * as fs from 'fs-extra';
import { basename, dirname, join } from 'path';
import { THUMBNAILSIZES } from '../../../src/app/shared/config/thumbnail.config';
import { Storage } from '@google-cloud/storage';
const os = require('os');

export const generateThumbnails = functions
  .region('europe-west1')
  .runWith({ memory: '512MB', timeoutSeconds: 15 })
  .storage.object().onFinalize(async object => {

    const gcs = new Storage();
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const contentType = object.contentType;
    const bucketDir = dirname(filePath);

    if (!contentType.startsWith('image/')) {
      console.log('This is not an image');
      return null;
    }

    const fileName = basename(filePath);
    if (fileName.startsWith('thumb_')) {
      console.log('Already a Thumbnail.');
      return null;
    }

    const workingDir = join(os.tmpdir(), 'thumbs');
    const tmpFilePath = join(workingDir, fileName);

    const metadata = {
      contentType: contentType,
    };

    await fs.ensureDir(workingDir);

    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    const uploadPromises = THUMBNAILSIZES.map(async thumbDef => {

      const thumbFileName = `thumb_${fileName}_${thumbDef.name}.${contentType.substring(contentType.indexOf('/') + 1)}`;
      const thumbFilePath = join(workingDir, thumbFileName);

      const fileTransform = sharp(tmpFilePath);

      if (object.contentType === 'image/jpeg') {
        fileTransform.jpeg({ quality: thumbDef.quality });
      }
      if (object.contentType === 'image/png') {
        fileTransform.png({ quality: thumbDef.quality });
      }

      if (thumbDef.width && thumbDef.height) {
        console.log(thumbDef);
        fileTransform.resize({ width: thumbDef.width, height: thumbDef.height });
      } else if (!thumbDef.width && thumbDef.height) {
        fileTransform.resize({ height: thumbDef.height });
      } else {
        fileTransform.resize(thumbDef.width);
      }

      await fileTransform.toFile(thumbFilePath);

      return bucket.upload(thumbFilePath, {
        destination: join(bucketDir, thumbFileName),
        metadata: metadata
      });
    });

    await Promise.all(uploadPromises);
    return fs.remove(tmpFilePath);
  });
*/
