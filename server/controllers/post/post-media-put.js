const {media:{ put: putToMedias }} = require('../../../stores/post');

module.exports = async(ctx) => {
    const query = ctx.params.idMedia ? {'media._id':ctx.params.idMedia} : ctx.query;
    query._id = ctx.params.idPost;
    const res = await putToMedias(query, ctx.request.body);

    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { success: true };
};
