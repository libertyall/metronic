'use strict';

// add sendgrid to env: firebase functions:config:set sendgrid.key=KEY
// npm run deploy (update functions)
// firebase login:ci
// add cronJobs via gcloud console:
// gcloud app deploy app.yaml cron.yaml --version=1
// https://console.cloud.google.com/logs
// gcloud app browse
// https://console.cloud.google.com/functions/list?project=sf-winterbach
// https://sf-winterbach.appspot.com
// set PYTHONIOENCODING=utf-8

export * from './main';
export * from './app';
export * from './calendar';
export * from './match';
export * from './media';
export * from './member';
export * from './social';
export * from './team';
export * from './user';
