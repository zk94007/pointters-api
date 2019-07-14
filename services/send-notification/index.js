const https = require('https');
const {
  google
} = require('googleapis');
const {
  fcmConfig: key
} = require('../../config');
const PROJECT_ID = key.project_id;
const HOST = 'fcm.googleapis.com';
const PATH = `/v1/projects/${PROJECT_ID}/messages:send`;
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

/**
 * Get Access token with Service Account Info
 *
 * @returns {Object} access_token Access token to FCM messaging.
 */
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

function sendNotification(fcmMessage) {
  getAccessToken().then((accessToken) => {
    console.log(accessToken);
    const options = {
      hostname: HOST,
      path: PATH,
      method: 'POST',
      // [START use_access_token]
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      // [END use_access_token]
    };
    

    for(let i=0; i<fcmMessage.message.token.length; i++){
      const notifcationMessage = {
        message: {
          notification: fcmMessage.message.notification,
          token: fcmMessage.message.token[i].token,
          android:{
            notification:{
              "sound":"default"
            },
            "priority":"high"
          },
          webpush: {
            fcm_options: {
              link:"http//www.pointters.com"
            }
          },
          apns : {
            payload:{
              "aps" : {
                 "sound" : "default",
                 "content-available" : 1,
                 "badge": fcmMessage.message.count

              }
            }
            
          },
          data:fcmMessage.message.data
        }
      };

      console.log(fcmMessage);
      
      const request = https.request(options, (resp) => {
        resp.setEncoding('utf8');
        resp.on('data', (data) => {
          console.log('Message sent to Firebase for delivery, response:');
          console.log(data);
        });
      });

      request.on('error', (err) => {
        console.log('Unable to send message to Firebase');
        console.log(err);
      });

      request.write(JSON.stringify(notifcationMessage));
      request.end();

    }

    // const request = https.request(options, (resp) => {
    //   resp.setEncoding('utf8');
    //   resp.on('data', (data) => {
    //     console.log('Message sent to Firebase for delivery, response:');
    //     console.log(data);
    //   });
    // });

    // request.on('error', (err) => {
    //   console.log('Unable to send message to Firebase');
    //   console.log(err);
    // });

    // request.write(JSON.stringify(fcmMessage));
    // request.end();
  });
}

module.exports.sendNotification = sendNotification;
