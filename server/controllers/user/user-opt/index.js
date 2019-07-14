const { update, findOne } = require('../../../../stores/user');
const {
  email: {
    sendEmail
  }
} = require('../../../../services');
const {
  optExpiresIn,
  longOfPasswordTemp,
  emailSenderingCong: {
    subjectOptEmail: subject,
    contentOptEmail: _content
  },
  angularSite: {
    url: angularSiteUrl
  }
} = require('../../../../config');

const errorInUpdateUser = 'Error on update user';
const getResetParams = require('./get-reset-params');
module.exports = async (ctx) => {
  const queryToFindUser = {
    email: ctx.request.body.email
  };
  const user = await findOne(queryToFindUser);

  if (!user || user.error) return ctx.throw(404, `User:${ctx.request.body.email} not found`);

  const updateTheAuthSettings = getResetParams(longOfPasswordTemp, optExpiresIn);
  //console.log('updateTheAuthSettings ', updateTheAuthSettings);
  //console.log('queryToFindUser ', queryToFindUser);
  const updated = await update(queryToFindUser, updateTheAuthSettings);
  if (updated && updated.error) ctx.throw(404, errorInUpdateUser);

  const content = _content + updateTheAuthSettings.tempPassword + '<br><a href="' + angularSiteUrl + 'resetpassword/' + user.email + '/' + updateTheAuthSettings.tempPassword + '">Click to reset your password</a>';
  const {
    error: errorInSendEmail
  } = await sendEmail(user.email, subject, content);
  //console.log('errorInSendEmail  ', errorInSendEmail);
  if (errorInSendEmail) ctx.throw(404, errorInSendEmail.message);
  ctx.status = 200;
};
