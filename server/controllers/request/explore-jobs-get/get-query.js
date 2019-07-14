const {Types:{ObjectId}} = require('../../../../databases/mongo');

module.exports = (ctx) => {
    const { gt_id, lt_id, sortBy, page:page, limit:limit } = ctx.query;
  	let query = { isActive:true };
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

    if (ctx.query.geoWithin) {
      const box = JSON.parse(ctx.query.geoWithin);
      query["location.geoJson"] = {
        $geoWithin: {
          $box: box
        }
      }
    }

    if (ctx.query.city) query["location.city"] = ctx.query.city;
    if (ctx.query.province) query["location.province"] = ctx.query.province;
    if (ctx.query.state) query["location.state"] = ctx.query.state;
    if (ctx.query.country) query["location.country"] = ctx.query.country;
//    if (ctx.query.searchString) query["category.id"] = ctx.query.categoryId;
    if (ctx.query.categoryId) query["category.id"] = ctx.query.categoryId;

    const options = {
      page: page,
      limit: limit,
      sort: sort
    };

    return { query, options };
};
