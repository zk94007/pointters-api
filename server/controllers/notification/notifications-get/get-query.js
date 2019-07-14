const {Types:{ObjectId}} = require('../../../../databases/mongo');
module.exports = (ctx) => {
    const { gt_id, lt_id, sortBy, input:inputPage, limit:inputLimit } = ctx.query;

    let options = {
      input: inputPage,
      limit: inputLimit,
      sort: { _id: -1 }
    };

    let query = { toUserId: ObjectId(ctx.queryToFindUserById._id) };

    if (sortBy === '-1') options.sort._id = -1;
    else if (sortBy === '1') options.sort._id = 1;

    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
        options.sort = { _id: -1 };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        options.sort = { _id: 1 };
    }

    return {query, options};
};
