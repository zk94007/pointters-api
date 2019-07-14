const { update, findOne } = require('../../../stores/user');
const {
  email: {
    sendEmail
  }
} = require('../../../services');
const Promise = require('bluebird');
const { map } = require('lodash');

module.exports = async (ctx) => {
  if (!ctx.request.body.email) return ctx.throw(404, `email field is required`);
  if (!Array.isArray(ctx.request.body.email) && ctx.request.body.email.length>0) return ctx.throw(404, `email field must be an array`);

  const subject = 'Invitation to join Pointters';
  let content = 'You have been invited to join Pointters';
  if(ctx.request.body.message) content = content + ': ' + ctx.request.body.message;

  let results = await Promise.all(map(ctx.request.body.email, (doc) => new Promise(async (resolve) => {
      let result = {
        email:doc
      };
      let mailStatus = await sendEmail(doc, subject, content);
      if (mailStatus.statusCode != 202) {
        result.error = errorInSendEmail.message;
        result.success = false;
      } else {
        result.success = true;
      }

      return resolve(result);
  })));
  results = results.filter(result => result);

  ctx.body = results;
  ctx.status = 200;
};
