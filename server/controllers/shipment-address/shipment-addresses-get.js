const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate: paginateAddress } = require('../../../stores/shipment-address');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: findOneUser } = require('../../../stores/user');

module.exports = async (ctx) => {
    const { gt_id, lt_id, sortBy, page:inputPage, limit:inputLimit } = ctx.query;
    let query = { userId: ctx.queryToFindUserById._id, isActive: true };
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
    const addresses = await paginateAddress(query, { page: inputPage, limit: inputLimit, sort:sort });

    if (addresses.total == 0 || addresses.error ) ctx.throw(404, 'No shipment addresses found');

    const { docs, total, limit, page, pages } = addresses;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    let results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = doc;
        return resolve(result);
    })));
    results = results.filter(result => result);

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
