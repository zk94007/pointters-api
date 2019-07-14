const {Types:{ObjectId}} = require('../../../../databases/mongo');
module.exports = (ctx) => {
    const { gt_id, lt_id, sortBy, page:inputPage, limit:inputLimit } = ctx.query;
    const query = {};

    let sort = { _id: -1 };
    if (sortBy === '-1') sort._id = -1;
    else if (sortBy === '1') sort._id = 1;

    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
        sort = { _id: -1 };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: 1 };
    }

    if(ctx.query.categoryId){
      query["category.id"]=ctx.query.categoryId;
    }

    query.isActive = true;

    const options = { };
    if(inputPage) options.page = parseInt(inputPage);
    if(inputLimit) options.limit = parseInt(inputLimit);

    return {query, options};
};
