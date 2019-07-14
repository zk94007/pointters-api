const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');
const updateTempPassword = require('./updateTemp-password');
const updatePass = require('./update-pass');
// const updateiOSToken = require('./update-ios-token');
// const updateAndroidToken = require('./update-android-token');
// const updateWebToken = require('./update-web-token');
module.exports = (client) => async (query = {}, _data = {}, options = {
  new: true
}) => {
  const data = Object.assign({}, _data);
  try {
    if (data.tempPassword) await updateTempPassword(data);
    if (data.password) await updatePass(data);
    // if (data.fcmiOSToken) await updateiOSToken(data);
    // if (data.fcmAndroidToken) await updateAndroidToken(data);
    // if (data.fcmWebToken) await updateWebToken(data);
    return catchingErrorFromPromise(client.findOneAndUpdate(query, {
      $set: data
    }, options).exec());
  } catch (error) {
    return {
      error
    };
  }
};
