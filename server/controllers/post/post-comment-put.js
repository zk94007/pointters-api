const { update: updateComment } = require('../../../stores/post-comment');
const { findOne: findOnePost } = require('../../../stores/post');

module.exports = async(ctx) => {
    const commentToupdate = ctx.request.body;
    const { error } = await updateComment({ _id: ctx.params.idComment }, commentToupdate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
