const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';

module.exports = async(ctx) => {
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(404, errorMessage);
    const queryToFindpost = { _id: ctx.params.idpost };

    ctx.body = {
        post: post
    };
};
