const {Types:{ObjectId}} = require('../../../../databases/mongo');

module.exports = (ctx) => {
    const { gt_id, lt_id, sortBy, page:inputPage, limit:inputLimit } = ctx.query;
  	let query = {
      query:{isActive:true},
      options:{}
    };
  	let sort = { _id: -1 };
  	if (sortBy === '-1') sort._id = -1;
  	else if (sortBy === '1') sort._id = 1;

    if (lt_id) {
        query.query._id = { $lt: ObjectId(lt_id) };
        sort = { _id: -1 };
    }
    if (gt_id) {
        query.query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: 1 };
    }

    if (ctx.params.idOffer) query.query._id = ctx.params.idOffer;
    if (ctx.params.idRequest) query.query.requestId = ObjectId(ctx.params.idRequest);
    if (ctx.query.geoWithin) {
      const box = JSON.parse(ctx.query.geoWithin);
      query.query["location.geoJson"] = {
        $geoWithin: {
          $box: box
        }
      }
    }

    query.options = {
      page: inputPage,
      limit: inputLimit,
      sort: sort
    };

    return query;
};
