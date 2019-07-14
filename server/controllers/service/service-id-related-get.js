const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate, findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const queryToFindService = ( { _id: ctx.params.idService })
    const service = await findOneService(queryToFindService);
    if(!service || service.error)
        ctx.throw(404, errorMessage);
    const { gt_id, lt_id, page:inputPage, limit:inputLimit } = ctx.query;
    let query = {};
    let p = 0;
    if(!service.location) {
        query = { "category.id": { $eq: service.category.id } };
        p = 1;
    }
    else {
        query = { "category.id": { $eq: service.category.id }, "category.name": { $eq: service.category.name } };
        p = 2;
    }
    let sort = { _id: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }

    const inputPageNum = inputPage?Number(inputPage):1;
    const inputLimitNum = inputPage?Number(inputLimit):10;
    const services = await paginate(query, { page: inputPageNum, limit: inputLimitNum, sort:sort });

    if (services.total == 0 || services.error) ctx.throw(404, 'Error in find services for nearby location');

    const { docs, total, limit, page, pages } = services;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.seller = {};
        result.service = {};

        result.service.id = doc._id;
        result.service.description = doc.description;
        result.service.fulfillmentMethod = doc.fulfillmentMethod;
        result.service.location = doc.location;
        result.service.media = doc.media;
        result.service.prices = doc.prices;
        result.service.promoted = doc.promoted;
        result.seller.userId = doc.userId;
        const user = await findOneUser({ _id: doc.userId });
        if(user)
        {
            result.seller.companyName = user.companyName;
            result.seller.firstName = user.firstName;
            result.seller.lastName = user.lastName;
            result.seller.phone = user.phone;
            result.seller.profilePic = user.profilePic;
            result.seller.verified = user.verified;
        }
        result.service.numOrders = await numOrders({ serviceId: doc._id });
        result.service.avgRating = await avgRating({ serviceId: doc._id });
        result.service.pointValue = 1;
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
