const {media:{ get: getToMedias }} = require('../../../stores/post');

module.exports = async(ctx) => {
    const query = ctx.params.idMedia ?
        {'media._id':ctx.params.idMedia} :
        ctx.query;
    query._id = ctx.params.idPost;

    const media = await getToMedias(query);

    if (media.error) ctx.throw(404, media.error.message);

    ctx.body = { success: true, media};
};
