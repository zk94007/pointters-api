const {
  create: createComment
} = require('../../../stores/post-comment');
const {
  findOne: findOnePost
} = require('../../../stores/post');
const { findOne: findUser } = require('../../../stores/user');
const notification = require('../../../services/send-notification');
const errorMessage = 'Post does not exists';
const getUserTokenWithID = require('../../lib/get-notification-token');
const {
  create: createNotification,
  count: countNotification
} = require('../../../stores/notification');

module.exports = async (ctx) => {
  const post = await findOnePost({
    _id: ctx.params.idPost
  });
  if (!post || post.error) ctx.throw(404, errorMessage);

  const commentToCreate = Object.assign({
      userId: ctx.queryToFindUserById._id,
      postId: ctx.params.idPost
    },
    ctx.request.body
  );
  const comment = await createComment(commentToCreate);
  if (comment.error) ctx.throw(404, comment.error.message);

  const commentUser = await findUser({ _id: ctx.queryToFindUserById._id });
  if (!commentUser || commentUser.error) ctx.throw(404, 'Technical error with login user');
  const commentData = {
    comment: comment.comment,
    updatedAt: comment.updatedAt,
    user: {
      userId: commentUser._id,
      firstName: commentUser.firstName,
      lastName: commentUser.lastName,
      profilePic: commentUser.profilePic
    }
  };
  ctx.body = commentData;
  ctx.body.success = true;

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

    const msg = {
      message: {
        notification: {
          title: `${commentData.user.firstName} commented on your post`,
          body: commentData.comment
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
