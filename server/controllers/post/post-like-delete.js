const { delete: deleteLike, findOne: findOneLike } = require('../../../stores/post-like');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
  const post = await findOnePost({ _id: ctx.params.idPost });

  if (!post || post.error) ctx.throw(404, errorMessage);

  const like = await findOneLike({ userId: ctx.queryToFindUserById._id, postId: ctx.params.idPost });

  if (!like || like.error) {
    ctx.status=404;
    ctx.body={ liked:false, message:"like does not exist" };
  } else {
    await deleteLike({ userId: ctx.queryToFindUserById._id, postId: ctx.params.idPost} );
    const likeDoc = await findOneLike( { userId: ctx.queryToFindUserById._id, postId: ctx.params.idPost} );

    if(!likeDoc || likeDoc.error) ctx.body = { liked: false, message: "successfully deleted like" };
    else {
      ctx.status = 500;
      ctx.body = { liked: true, message: "technical error in delete like" };
    }
  }
};
