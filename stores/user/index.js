const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const comparePassword = require('./compare-password');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const Delete = require('./delete');
const unset = require('./unset');
const search = require('./search');
const updateEmailBounce = require('./update-email-bounce');
const updateEmailSpam = require('./update-email-spam');
const postFcmToken = require('./post-fcm-token');
const putFcmToken = require('./put-fcm-token');
const getFcmToken = require('./get-fcm-token');
const deleteFcmToken = require('./delete-fcm-token');

module.exports = {
  comparePassword: comparePassword,
  unset: unset(client),
  findOne: findOne(client),
  updateEmailBounce: updateEmailBounce(client),
  updateEmailSpam: updateEmailSpam(client),
  delete: Delete(client),
  search: search(client),
  create: create(client),
  update: update(client),
  remove: remove(client),
  updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client),
  postFcmToken: postFcmToken(client),
  putFcmToken: putFcmToken(client),
  getFcmToken: getFcmToken(client),
  deleteFcmToken: deleteFcmToken(client),
};
