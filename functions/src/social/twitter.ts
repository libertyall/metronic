import * as functions from 'firebase-functions';

export const twitter = functions.region('europe-west1').https.onRequest((req, res) => {
  // return cors(req, res, () => {

  const data = {
    id: req.body.id,
    message: req.body.message
  };

  console.log(data.id);

  res.send('success');
  // })
});

/*

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const Twit = require("twit");
const express = require("express");
admin.initializeApp();

const expressRouter = new express.Router();
const config = {
    consumer_key:         functions.config().twitter.consumer.key,
    consumer_secret:      functions.config().twitter.consumer.secret,
    access_token:         functions.config().twitter.access.token,
    access_token_secret:  functions.config().twitter.access.tokensecret,
    strictSSL:            true // Can add a timeout here, but I decided not to; make sure if you're going this route you add the tokens above to your function config through the CLI; this will correspond to your Twitter bot's values
};
const T = new Twit(config);

// This has some Clever Code (TM) in it. Essentially, the flow is:
// 1) Run CRON job/hit the https endpoint
// 2) When the https endpoint is hit, update a specific path in the database; this will ensure the https endpoint returns immediately, while async processing happens in an onUpdate call, as per CFfFirebase documentation
// 3) In onUpdate, get all Tweets at your bot since the last time the Bot was run.
// 4) If Tweet is a #JoinNewGame Tweet, then copy the Start Room to that user's state. From this point on, everything depends on their current state.
// 5) If Tweet is not a #JoinNewGame Tweet, then interpret the Tweet as an action and process accordingly.
// 6) In this case, we only support navigation, so interpret it as an option that was available previously. Look at their state/current_room value, find the appropriate command matching the action, and copy the new
//    current_room into the user's state.
// 7) Finally, when any user's current_room is updated, send them a Tweet with the new room description and actions so they can continue on their way. There's a subtle bug here
//    where it will update everyone's room and send them a Tweet because the database.ref in updateUsersRoom runs for all people whenever any one person updates their room.
//    This is probably what killed my bot when other people start joining, and causing the rate limiting policy to kick in (it would write a ton of rooms and hence Tweets rapidly).
//    Hence, this approach is by no means perfect, and a better approach would need to be found. I guess the idea would be that instead of listening to the below change, you listen to
//    another change that only gets updated for that specific user and hence only sends one Tweet for them. Another, simpler approach would be to include the user's ID in the state,
//    and then just double-check that the userId from the context.params, below, is equal to the value in the state. If it is, then update, otherwise just immediately return without Tweeting.

export const updateUsersRoom = functions.database.ref('/users/{userId}/{userName}/state/current_room').onUpdate((snapshot, context) =>
{
    function getRoomDescription()
    {
        return snapshot.after.child('title').val();
    }
    function getRoomActions()
    {
        return snapshot.after.child('actions_str').val();
    }

    // I poorly decided to add a TimeStamp to every Tweet in case it was trying to send multiple. Twitter doesn't allow multiples of the exact same Tweet. This was a mistake, because it hid certain errors.
    T.post('statuses/update', { status: '@' + context.params.userName + ' ' + getRoomDescription() + ' at ' + new Date().toLocaleTimeString() + '. Actions: ' + getRoomActions() },
    (error, updata, resp) =>
    {
        // Error handling
    });
    return Promise.resolve(true);
});

export const replyToTweets = functions.database.ref('/passes/latest').onWrite((event) =>
{
    async function act(status)
    {
        // Replace the bot's name from the Tweet, and also make sure you're using your own Bot's name here
        const text = status.text.toLowerCase().replace('@ABCBot', '').trim();
        await admin.database().ref(getUsersState(status)).once('value').then(async snapshot =>
        {
            if (status.entities.hashtags.some(hashtag => hashtag.text.toLowerCase() === 'joinnewgame'))
            {
                await admin.database().ref('/rooms/StartRoom').once('value').then(async nextSnap =>
                {
                    if (nextSnap.val())
                    {
                        await admin.database().ref(getUsersCurrentRoom(status)).set(nextSnap.val());
                    }
                    else
                    {
                        // Error handling - no start room available for some reason
                    }
                });
            }
            else
            {
                await admin.database().ref(getUsersCurrentRoom(status) + '/available_actions').once('value').then(async newSnapshot =>
                {
                    if (newSnapshot.exists())
                    {
                        newSnapshot.forEach((childSnap) =>
                        {
                            const childId = childSnap.child('action_id').val().toLowerCase().trim();
                            if (text === childId && text.length === childId.length)
                            {
                                const childActionValue = childSnap.child('action_value').val();
                                return admin.database().ref('/rooms/' + childActionValue).once('value').then(async roomSnapshot =>
                                {
                                    await admin.database().ref(getUsersState(status)).set({current_room: roomSnapshot.val()}).then(() =>
                                    {
                                        return true; // Returning like this breaks the forEach
                                    });
                                });
                            }
                            return false; // Returning like this continues the forEach
                        });
                    }
                    else
                    {
                        // Error handling, couldn't find the room
                    }
                });
            }
        });
    }

    return admin.database().ref('/processed_tweets/latest_tweet_id/id').once('value').then(snapshot =>
    {
        // Update the to: and from: fields to ensure that, during testing, you only have one person being able to test; this is due to the bug seen at the top
        T.get('search/tweets', {q: 'to:ABCBot from:XYZUser', since_id: snapshot.val() }, (err, data, response) =>
        {
            if (data.statuses.length)
            {
                const processed_user_actions = [];
                data.statuses.forEach(async status =>
                {
                    if (!processed_user_actions.some((val, idx, arr) => val === status.user.id_str)) // This ensures that any extra Tweets sent between the command and the Tweet from our bot are not processed; otherwise, this could corrupt our game state
                    {
                        await act(status);
                        processed_user_actions.push(status.user.id_str);
                        await admin.database().ref('processed_tweets/latest_tweet_id/').set({id: status.id_str}); // Write the latest processed Tweet here so that later we do not reprocess that Tweet. I'm curious to know if there's a bug here and with
                                                                                                                  // the .once above, but I do not believe there is...once should only take it once, and the function itself is not listening at this position.
                    }
                });
            }
            else
            {
                // Not error handling: this just means the bot hasn't been messaged since the last time the CRON job ran. Handle according to your purposes
            }
        });
    });
});

expressRouter.get('*', (req, res) =>
{
    // Simple trick using Date.now() to update a path with the CRON job hitting this specific https endpoint. This will just cause the global game state to be updated. Only using Express because what I was doing before was annoying, and was intending to update this to be more Expressy.
    return admin.database().ref('/passes/latest').set({passing: Date.now()}).then((snapshot) => res.send('Success!'));
});

export const makePass = functions.https.onRequest(expressRouter);

function getUsersState(status: any): string | admin.database.Reference {
    return '/users/' + status.user.id_str + '/' + status.user.screen_name + '/state';
}

function getUsersCurrentRoom(status: any): string | admin.database.Reference {
    return getUsersState(status) + '/current_room';
}

 */
