const {
  create: createSendService
} = require('../../../stores/send-service');
const notification = require('../../../services/send-notification');
const getRecipientTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');

module.exports = async (ctx) => {
  const sendService = await createSendService(ctx.request.body);

  if (sendService.error) ctx.throw(404, sendService.error.message);

  ctx.body = {
    success: true,
    sendService
  };


  const recipientToken = await getRecipientTokenWithID(sendService.userId);
  const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:sendService.userId});

  const msg = {
    message: {
      notification: {
        title: `${firstName} ${lastName} sent you a service`,
        body: sendService.description
      },
      token: recipientToken.token,
      data:{
          type:"send-service",
          id: sendService._id
      }
    }
  };
  notification.sendNotification(msg);
};
