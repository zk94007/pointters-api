const { findOne } = require('../../../stores/user');
const {
  count: countNotification
} = require('../../../stores/notification');
const { count: countFollowing } = require('../../../stores/following');
const { count: countShares } = require('../../../stores/service-share');
module.exports = async(ctx) => {
    const userId = ctx.queryToFindUserById._id;

    const requester = await findOne({_id: userId});
    if (!requester || requester.error) ctx.throw(404, 'User not found');

   const unreadNotifications = await countNotification({markedRead:false, toUserId:userId});
   const buyOrdersNotifications = await countNotification({markedRead:false, toUserId:userId, type:'order', buyOrSell:'buy'});
   const buyOffersNotifications = await countNotification({markedRead:false, toUserId:userId, type:'offer', buyOrSell:'buy'});
   const buyRequestsNotifications = await countNotification({markedRead:false, toUserId:userId, type:'request', buyOrSell:'buy'});
   const sellOrdersNotifications = await countNotification({markedRead:false, toUserId:userId, type:'order', buyOrSell:'sell'});
   const sellOffersNotifications = await countNotification({markedRead:false, toUserId:userId, type:'offer', buyOrSell:'sell'});
   const sellRequestsNotifications = await countNotification({markedRead:false, toUserId:userId, type:'request-offer', buyOrSell:'sell'});

   const cntFollowing = await countFollowing({ followFrom: ctx.queryToFindUserById._id });
   const cntFollowers = await countFollowing({ followTo: ctx.queryToFindUserById._id });

   const cntShares = await countShares({ followTo: ctx.queryToFindUserById._id });

  // console.log(" unreadNotifications========", unreadNotifications);

    let menu = {
      counts:{
          followers: cntFollowers,
          following: cntFollowing,
          points: cntShares,
          notifications: unreadNotifications,
          buy: {
            orders: buyOrdersNotifications,
            offers: buyOffersNotifications,
            request: buyRequestsNotifications
          },
          sell: {
            orders: sellOrdersNotifications,
            offers: sellOffersNotifications,
            jobs: sellRequestsNotifications
          }
      }
    }

    ctx.body = menu;
};
