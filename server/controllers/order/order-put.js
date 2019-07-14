const {
  update: updateOrder,
  findOne: findOneOrder
} = require('../../../stores/order');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');
const buildCommonMessage = require('../push-notification/push-notification');
const notification = require('../../../services/send-notification');
const getSellerTokenWithID = require('../../lib/get-notification-token');
module.exports = async (ctx) => {
  const orderToupdate = ctx.request.body;
  const {
    error
  } = await updateOrder({
    _id: ctx.params.idOrder
  }, orderToupdate);

  if (error) ctx.throw(404, error.message);

  ctx.body = {
    success: true
  };
  const orderToupdated = await findOneOrder({_id: ctx.params.idOrder});
  /* temp function */
  const sellerToken = await getSellerTokenWithID(orderToupdated.sellerId);

  if(sellerToken.token[0].token!== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: orderToupdate.description,
      serviceId: orderToupdate.serviceId,
      toUserId: orderToupdate.sellerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} requested to change service schedule`,
          body: orderToupdated.description
        },
        token: sellerToken.token,
        data:{
          type:"order",
          id: orderToupdate._id,
          notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }

  
};
