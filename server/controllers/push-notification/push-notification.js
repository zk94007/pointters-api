const https = require('https');
const {
  google
} = require('googleapis');
const {
  fcmConfig: key
} = require('../../../config');
const PROJECT_ID = key.project_id;
const HOST = 'fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

/**
 * Get a valid access token.
 */
// [START retrieve_access_token]
module.exports.buildCommonMessage = (data) => {
  return {
    'message': {
      // 'topic': 'news',
      'notification': {
        'title': data.title,
        'body': data.body
      },
      "token": data.token
    }
  };
};

module.exports = async (ctx) => {

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
  // [END retrieve_access_token]

  /**
   * Send HTTP request to FCM with given message.
   *
   * @param {JSON} fcmMessage will make up the body of the request.
   */
  function sendFcmMessage(fcmMessage) {
    getAccessToken().then((accessToken) => {
      const options = {
        hostname: HOST,
        path: PATH,
        method: 'POST',
        // [START use_access_token]
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
        // [END use_access_token]
      };

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

      request.write(JSON.stringify(fcmMessage));
      request.end();
    });
  }

  /**
   * Return message content
   * @param {JSON} data notification message
   * @returns {JSON} notification info
   */
  function buildCommonMessage(data) {
    console.log(data);
    return {
      'message': {
        // 'topic': 'news',
        'notification': {
          'title': 'FCM Notification',
          'body': 'Notification from FCM'
        },
        "token": "ep8PWr-LJwM:APA91bGSqXUr-fqerpWHM09U6fhHczyAP5oM8BbM13XTUsrNT6TdUgLyuNXyA59o6tDoEPgk39uy-SQiLCmPRijM9OkOoI9rkDUfUnM322VsVwjHFLuPgo8gK3jfmjWXKFzHhg5xIjg9"
      }
    };
  }

  /**
   * Construct a JSON object that will be used to customize
   * the messages sent to iOS and Android devices.
   * @returns {JSON} override notification info
   */
  function buildOverrideMessage() {
    const fcmMessage = buildCommonMessage();
    const apnsOverride = {
      'payload': {
        'aps': {
          'badge': 1
        }
      },
      'headers': {
        'apns-priority': '10'
      }
    };

    const androidOverride = {
      notification: {
        click_action: 'android.intent.action.MAIN'
      }
    };

    fcmMessage['message']['android'] = androidOverride;
    fcmMessage['message']['apns'] = apnsOverride;

    return fcmMessage;
  }

  /**
   * Construct a JSON object that will be used to define the
   * common parts of a notification message that will be sent
   * to any app instance subscribed to the news topic.
   */
  sendFcmMessage(buildCommonMessage());
  // sendFcmMessage(buildOverrideMessage());
};
