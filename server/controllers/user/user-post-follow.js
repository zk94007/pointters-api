const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createFollowing,
  findOne: findFollowing
} = require('../../../stores/following');
const isValidId = require('../../lib/is-valid-id');
const idInvalidMessage = 'Invalid followedId';
const notification = require('../../../services/send-notification');
const getfollowedTokenWithID = require('../../lib/get-notification-token');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  const validId = await isValidId(ctx.params.followedId);
  if (!validId) return ctx.throw(404, idInvalidMessage);

  const userToFollow = await findOneUser({
    _id: ctx.params.followedId
  });
  if (!userToFollow) return ctx.throw(404, idInvalidMessage);

  const query = {
    followTo: ctx.params.followedId,
    followFrom: ctx.queryToFindUserById._id
  };
  const follow = await findFollowing(query);


  


  if (follow && !follow.error) {
    ctx.status = 409;
    ctx.body = {
      followed: true,
      message: "cannot POST because follow already exists"
    };
  } else {
    const followCreate = await createFollowing(query);
    const followedToken = await getfollowedTokenWithID(ctx.params.followedId);
    

    
    if (followCreate && !followCreate.error) {
      ctx.body = {
        followed: true,
        message: "successfully followed"
      };

      if( followedToken.token[0].token !== ''){

        const notificationStore = Object.assign({
          lastFromUserId: ctx.state.user.id,
          toUserId: ctx.params.followedId,
          type: 'follow'
        });

        const fcmNotification = await createNotification(notificationStore);
        const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});
        const {firstName: firstName,
             lastName: lastName} = await findOneUser({_id:ctx.state.user.id});
        const msg = {
          message: {
            notification: {
              title: 'Pointters',
              body: `${firstName} ${lastName} followed you`
            },
            token: followedToken.token,
            data:{
                type:"user",
                id: userToFollow._id,
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
        followed: false,
        message: "technical error in follow"
      };
    }
  }
};
