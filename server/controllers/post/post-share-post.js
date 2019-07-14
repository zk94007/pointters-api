const { create: createShare } = require('../../../stores/post-share');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    const post = await findOnePost({ _id: ctx.params.idPost });
    if (!post || post.error) ctx.throw(404, errorMessage);

    const shareToCreate = {
        userId: ctx.state.user.id,
        postId: ctx.params.idPost
    };
    const share = await createShare(shareToCreate);

    if (share && share.error) ctx.throw(500, share.error.message);

    ctx.body = { success: true };
};
