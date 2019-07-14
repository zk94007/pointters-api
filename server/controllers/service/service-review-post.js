const {
  findOne: findOneService
} = require('../../../stores/service');
const {
  create: createReview,
  findOne
} = require('../../../stores/service-review');
const notification = require('../../../services/send-notification');
const getSellerTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

const errorOnFindService = 'Error in find service';
module.exports = async (ctx) => {

  const serviceToAddReview = findOneService({
    _id: ctx.params.serviceId
  });
  const reviewInDB = await findOne({
    orderId: ctx.request.body.orderId
  });

  if (reviewInDB) ctx.throw(409);
  if (!serviceToAddReview || serviceToAddReview.error) ctx.throw(404, errorOnFindService);

  const dataFromRequest = {
    userId: ctx.state.user.id,
    serviceId: ctx.params.serviceId,
    sellerId: require('mongoose').Types.ObjectId()
  };
  const reviewToCreate = Object.assign(dataFromRequest, ctx.request.body);
  const review = await createReview(reviewToCreate);
  if (review.error) {
    if (/duplicate key error index/.exec(review.error.err)) ctx.throw(409);
    ctx.throw(404, review.error.message);
  }
  console.log(review);
  ctx.body = {
    success: true,
    review
  };

  /* temp function */
  const sellerToken = await getSellerTokenWithID(dataFromRequest.sellerId);


  if( sellerToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: order.description,
      serviceId: dataFromRequest.serviceId,
      toUserId: dataFromRequest.sellerId,
      type: 'service'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const {firstName: firstName,
           lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} reviwed on an order you completed`,
          body: review.comment
        },
        token: sellerToken.token,
        data:{
          type:"service",
          id: dataFromRequest.serviceId,
          notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }

  
};
