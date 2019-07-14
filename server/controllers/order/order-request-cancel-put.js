const {
  update: updateOrder
} = require('../../../stores/order');
const notification = require('../../../services/send-notification');
const getSellerTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  const orderToupdate = ctx.request.body;
  orderToupdate.buyerOrderDispute.cancellation = true;
  console.log('ctx.params.idOrder '+ctx.params.idOrder);
  const result = await updateOrder({
    _id: ctx.params.idOrder
  }, orderToupdate);

  if (!result || result.error) ctx.throw(404, result.error.message);

  ctx.body = {
    success: true
  };
  
  /* temp function */
  const sellerToken = await getSellerTokenWithID(result.sellerId);

  if( sellerToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: result.description,
      serviceId: result.serviceId,
      toUserId: result.sellerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} requested to cancel order`,
          body: orderToupdate.description
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
