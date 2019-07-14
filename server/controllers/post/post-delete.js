const { remove: removePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    const postRemoved = await removePost({ _id: ctx.params.idPost });
    if (!postRemoved || postRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(postRemoved.ok) };
};
