const {media:{ push: pushToMedias }} = require('../../../stores/post');

module.exports = async(ctx) => {
    const query = {_id:ctx.params.idPost};
    const {media, error} = await pushToMedias(query, ctx.request.body);
    if (error) ctx.throw(404, media.error.message);

    ctx.body = { success: true, media: media[media.length - 1]};
};
