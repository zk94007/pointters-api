const {
  update: updateOrder,
  findOne: findOneOrder
} = require('../../../stores/order');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');
const notification = require('../../../services/send-notification');
const getUserTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');

module.exports = async (ctx) => {
  const orderToupdate = {
    sellerAcceptedScheduleTime:true,
    sellerAcceptedScheduleTimeDate: new Date()
  };
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
  const userToken = await getUserTokenWithID(orderToupdated.buyerId);

  if( userToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: orderToupdated.description,
      serviceId: orderToupdated.serviceId,
      toUserId: orderToupdated.buyerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});
    
    const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} accepted new service service`, 
          body: orderToupdated.description
        },
        token: userToken.token,
        data:{
          type:"order",
          id: orderToupdated._id,
          notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);

   } 

};
