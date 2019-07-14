const { remove: removeComment } = require('../../../stores/post-comment');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idComment ', ctx.params.idComment);
    const postRemoved = await removeComment({ _id: ctx.params.idComment });
    console.log('postRemoved', postRemoved);
    if (!postRemoved || postRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(postRemoved.ok) };
};
