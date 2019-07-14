const { findOne: findOneLike } = require('../../../stores/post-like');
const { findOne: findOnePost } = require('../../../stores/post');
const errorMessage = 'Post does not exists';
const technicalError = 'Technical error';

module.exports = async(ctx) => {
  const post = await findOnePost({ _id: ctx.params.idPost });

  if (!post || post.error) ctx.throw(404, errorMessage);

  const likes = await findOneLike({ userId: ctx.queryToFindUserById._id, postId: ctx.params.idPost });

  if(likes && likes.error) ctx.throw(500, technicalError);
  else {
    if (!likes) ctx.body = { liked:false };
    else ctx.body = { liked:true };
  }
};
