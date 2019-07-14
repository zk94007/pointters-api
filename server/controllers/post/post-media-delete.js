const {media:{ pull: pullToMedias }} = require('../../../stores/post');

module.exports = async(ctx) => {
    const query = {_id : ctx.params.idPost};
    const res = await pullToMedias(query, ctx.idMedia);

    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { success: true };
};
