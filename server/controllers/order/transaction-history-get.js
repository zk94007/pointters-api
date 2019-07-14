const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
	  let { gt_id, lt_id, sortBy, page:inputPage, limit:inputLimit } = ctx.query;
    let query = { buyerId: ctx.queryToFindUserById._id };
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
		inputPage=inputPage?Number(inputPage):1;
		inputLimit=inputLimit?Number(inputLimit):10;

		let options = {
			page:inputPage,
			limit:inputLimit,
			sort:sort
		};
    const buyers = await paginate(query, options);
    if ( buyers.total == 0 || buyers.error ) ctx.throw(404, "No order found");

    const { docs, total, limit, page, pages } = buyers;
		let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
				result.orderId = doc._id;
				result.description = doc.description;
				result.currencyCode = doc.currencyCode;
        result.currencySymbol = doc.currencySymbol;
				result.amount = doc.totalAmount;
        result.date = doc.paymentDate;
        return resolve(result);
    })));

		let currencyCode = 'USD';
		let currencySymbol = '$';
		let totalPurchases = '145.88';
		let totalActiveOrderPurchases = '45.88';
		let totalCompletedOrderPurchases = '100';
		let totalPersonalBalance = '100';
		let totalSalesEarning = '100';

    ctx.status = 200;
    ctx.body = {
			currencyCode: currencyCode,
			currencySymbol: currencySymbol,
			totalPurchases: totalPurchases,
			totalActiveOrderPurchases: totalActiveOrderPurchases,
			totalCompletedOrderPurchases: totalCompletedOrderPurchases,
			totalPersonalBalance: totalPersonalBalance,
			totalSalesEarning: totalSalesEarning,
			docs: results,
			total: total,
			limit: limit,
			page: page,
			pages: pages,
			lastDocId: lastDocId
		};
};
