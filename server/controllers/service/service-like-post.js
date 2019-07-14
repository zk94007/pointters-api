const {
  create: createLike,
  findOne: findOneLike
} = require('../../../stores/service-like');
const {
  findOne: findOneService
} = require('../../../stores/service');
const notification = require('../../../services/send-notification');
const errorMessage = 'Service does not exists';

const getserviceTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  const service = await findOneService({
    _id: ctx.params.idService
  });
  if (!service || service.error) ctx.throw(404, errorMessage);

  const like = await findOneLike({
    userId: ctx.queryToFindUserById._id,
    serviceId: ctx.params.idService
  });
  if (like && !like.error) {
    ctx.status = 409;
    ctx.body = {
      liked: true,
      message: "cannot POST because like already does exists"
    };
  } else {
    const likeCreate = await createLike({
      userId: ctx.queryToFindUserById._id,
      serviceId: ctx.params.idService
    });
    const serviceToken = await getserviceTokenWithID(service.userId);
    if (likeCreate && !likeCreate.error) {
      ctx.body = {
        liked: true,
        message: "successfully liked"
      };
      if( serviceToken.token[0].token !== ''){
        const notificationStore = Object.assign({
          lastFromUserId: ctx.state.user.id,
          description: service.description,
          serviceId: service._id,
          toUserId: service.userId,
          type: 'service'
        });
        const fcmNotification = await createNotification(notificationStore);
        const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});
        const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});
        const msg = {
          message: {
            notification: {
              title: `${firstName} ${lastName} liked your service`,
              body: service.description
            },
            token: serviceToken.token,
            data:{
                type:"service",
                id: service._id,
                notificationId:fcmNotification._id
            },
            count: unreadNotifications
          }
        };
        notification.sendNotification(msg);
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        liked: false,
        message: "technical error in like"
      };
    }
  }
};
