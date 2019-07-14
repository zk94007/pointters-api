const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/service-like');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorInGetWatching = 'like does not exists';

module.exports = async(ctx) => {
    const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
    let query = { userId: ctx.queryToFindUserById._id };
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

    const likes = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });

    if (likes.total == 0 || likes.error) ctx.throw(404, errorInGetWatching);

    const { docs, total, limit, page, pages } = likes;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
    	let result = {};
    	result.service = {};
	    result.user = {};
	    result.service.id = doc.serviceId;
    	const service = await findOneService({ _id: doc.serviceId });
    	if (service)
    	{
          result.service.tagline = service.tagline;
	        result.service.description = service.description;
	        result.service.media = service.media[0];
	        result.service.location = service.location;
	        result.service.prices = service.prices[0];
          result.service.promoted = service.promoted;
        }
        result.user.id = doc.userId;
        const user = await findOneUser({ _id: doc.userId });
        if(user)
        {
	        result.user.firstName = user.firstName;
	        result.user.lastName = user.lastName;
	        result.user.profilePic = user.profilePic;
        }
        result.numOrders = 0;
        result.avgRating = 0;
        result.pointValue = 1;
        result.numOrders = await numOrders({ serviceId: doc.serviceId });
        result.avgRating = await avgRating({ serviceId: doc.serviceId });
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
}
