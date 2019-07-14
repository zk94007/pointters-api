const {
  update: updatePost,
  findOne: findOnePost
} = require('../../../stores/post');

const errorMessage = 'Post does not exists';
const notification = require('../../../services/send-notification');
const getUserTokenWithID = require('../../lib/get-notification-token');

module.exports = async (ctx) => {
  const {
    error
  } = await updatePost({
    _id: ctx.params.idPost
  }, ctx.request.body);

  if (error) ctx.throw(404, errorMessage);

  ctx.body = {
    success: true
  };
  const post = await findOnePost({_id:ctx.params.idPost});
  
  const userToken = await getUserTokenWithID(ctx.state.user.id);

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
          title: 'Post update',
          body: `Your post update '${ctx.request.body.message}' has 100 new likes`
        },
        token: userToken.token,
        data:{
            type:"post",
            id: ctx.params.idPost,
            notificationId:fcmNotification._id
        },
        count: unreadNotifications
      }
    };
    notification.sendNotification(msg);
  }
};
