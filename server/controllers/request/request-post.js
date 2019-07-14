const {
  create: createRequest,
  update: updateRequest
} = require('../../../stores/request');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Request does not exists';
const notification = require('../../../services/send-notification');
const getSellerTokenWithID = require('../../lib/get-notification-token');
const dynamicLink = require('../../../services/dynamic-link');
const {
  findOne: findOneUser
} = require('../../../stores/user');

const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  if(ctx.request.body.serviceId && !ctx.request.body.category){
    const foundService = await findOneService({_id:ctx.request.body.serviceId});
    if(!foundService || foundService.error) ctx.throw(404, 'service linked is not found');
    ctx.request.body.category = foundService.category;
    ctx.request.body.sellerId = foundService.userId;
    if(!ctx.request.body.media) ctx.request.body.media = foundService.media;
  }

  const requester = await findOneUser({_id:ctx.state.user.id});
  if(!requester || requester.error) ctx.throw(401, 'Login user session invalid');
  if(!ctx.request.body.location) ctx.request.body.location = requester.location;

  const request = await createRequest(Object.assign(ctx.request.body, {
    userId: ctx.queryToFindUserById._id
  }));
  if (!request || request.error) ctx.throw(404, errorMessage);

  // create dynamic link
  const shareLink = await dynamicLink(`/request/${request._id}`);
  updateRequest({_id:request._id}, {shareLink:shareLink});
  request.shareLink=shareLink;

  ctx.body = request;

  //console.log("REQUEST______________", request);

  /* temp function */
  const sellerToken = await getSellerTokenWithID(request.sellerId);

  if( sellerToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: request.description,
      toUserId: request.sellerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const {firstName: firstName,
             lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} requested a custom offer from you`,
          body: request.description
        },
        token: sellerToken.token,
        data:{
            type:"request",
            id: request._id,
            notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }
};
