const { findOne: findOneCheckr } = require('../../../stores/background-report');
const { findOne: findCandidate } = require('../../../stores/background-candidate');

const errorInGet = 'Error in getting background check';
const notification = require('../../../services/send-notification');
const getUserTokenWithID = require('../../lib/get-notification-token');

module.exports = async (ctx) => {
  const queryToFindCheckr = {
    _id: ctx.params.id
  };
  console.log('queryToFindCheckr ', queryToFindCheckr);
  //const checkr = await findOneCheckr(queryToFindCheckr);
  const checkr = await findCandidate(queryToFindCheckr);
  console.log('checkr ', checkr);

  if (!checkr || checkr.error) ctx.throw(403, errorInGet);

  ctx.body = checkr;
  const userToken = await getUserTokenWithID(ctx.state.user.id);

  const msg = {
    message: {
      notification: {
        title: 'Background check',
      },
      body: `Your background check is ${checkr}`,
      token: userToken.token,
      data:{
          type:"background-check",
          id: checkr._id
      }
    }
  };
  notification.sendNotification(msg);
};
