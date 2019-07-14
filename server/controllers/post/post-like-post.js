const {
  create: createLike,
  findOne: findOneLike
} = require('../../../stores/post-like');
const {
  findOne: findOnePost
} = require('../../../stores/post');
const notification = require('../../../services/send-notification');
const errorMessage = 'Post does not exists';
const getUserTokenWithID = require('../../lib/get-notification-token');
const {
  findOne: findOneUser
} = require('../../../stores/user');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  const post = await findOnePost({
    _id: ctx.params.idPost
  });
  if (!post || post.error) ctx.throw(404, errorMessage);

  const like = await findOneLike({
    userId: ctx.queryToFindUserById._id,
    postId: ctx.params.idPost
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
      postId: ctx.params.idPost
    });

    if (likeCreate && !likeCreate.error)
      ctx.body = {
        liked: true,
        message: "successfully liked"
      };
    else {
      ctx.status = 500;
      ctx.body = {
        liked: false,
        message: "technical error in like"
      };
    }
  }
  const userToken = await getUserTokenWithID(post.userId);

  if( userToken.token[0].token !== ''){

    const notificationStore = Object.assign({
      lastFromUserId: ctx.state.user.id,
      description: post.description,
      postId: post._id,
      toUserId: post.userId,
      type: 'post'
    });

    const fcmNotification = await createNotification(notificationStore);
    const unreadNotifications = await countNotification({markedRead:false, toUserId:notificationStore.toUserId});

    const {firstName: firstName,
             lastName: lastName} = await findOneUser({_id:ctx.state.user.id});

    console.log(post);

    const msg = {
      message: {
        notification: {
          title: `${firstName} ${lastName} liked your post`,
          body: post.message
        },
        token: userToken.token,
        data:{
            type:"post",
            id: post._id,
            notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }
};
