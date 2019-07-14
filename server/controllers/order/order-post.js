const {
  create: createOrder,
  update: updateOrder
} = require('../../../stores/order');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');
const notification = require('../../../services/send-notification');
const getSellerTokenWithID = require('../../lib/get-notification-token');
const dynamicLink = require('../../../services/dynamic-link');
const {Types:{ObjectId}} = require('../../../databases/mongo');

module.exports = async (ctx) => {
  const orderToCreate = Object.assign({
      userId: ctx.state.user.id,
    },
    ctx.request.body
  );
  //const { error } = await createOrder(orderToCreate);

  
  

  const order = await createOrder(orderToCreate);
  if (order.error) ctx.throw(404, error.message);

  // create dynamic link
  const shareLink = await dynamicLink(`/order/${order._id}`);
  const updateOrderData = updateOrder({_id:order._id}, {shareLink:shareLink});
  if (updateOrderData.error) ctx.throw(404, error.message);
  order.shareLink=shareLink;
  

  ctx.body = {
    order: order
  };

  /* temp function */
  const sellerToken = await getSellerTokenWithID(order.sellerId);

  console.log(" user token========", sellerToken);


  if( sellerToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: order.description,
      serviceId: order.serviceId,
      toUserId: order.sellerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    console.log("This is notification store========",fcmNotification);
    console.log("unreadNotifications=========", unreadNotifications);

    const msg = {
      message: {
        notification: {
          title: 'You have a new Order',
          body: order.description
        },
        token: sellerToken.token,
        data:{
          type:"order",
          id: order._id,
          notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }

  
};
