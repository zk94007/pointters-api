const {Types:{ObjectId}} = require('../../../../databases/mongo');

module.exports = (ctx) => {
    const query = {
      query: {},
      options: {
        sort: { _id: -1 }
      }
    };

    if (ctx.params.idPost) query.query.postId = ctx.params.idPost;
    if (ctx.params.idComment) query.query._id = ctx.params.idComment;

    if (ctx.query.sortBy === '-1') query.options.sort._id = -1;
    else if (ctx.query.sortBy === '1') query.options.sort._id = 1;

    if (ctx.query.page) query.options.page = ctx.query.page;
    if (ctx.query.limit) query.options.limit = ctx.query.limit;

    if (ctx.query.lt_id) {
        query.query._id = { $lt: ObjectId(ctx.query.lt_id) };
        query.options.sort = { _id: -1 };
    }
    if (ctx.query.gt_id) {
        query.query._id = { $gt: ObjectId(ctx.query.gt_id) };
        query.options.sort = { _id: 1 };
    }

    return query;
};
