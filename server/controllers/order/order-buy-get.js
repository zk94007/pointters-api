const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
		const { gt_id, lt_id, sortBy, page, limit } = ctx.query;
    let query = { buyerId: ObjectId(ctx.queryToFindUserById._id) };
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

		let options = {
      sort: sort
    };
    if (page) options.page = page;
    if (limit) options.limit = limit;

    const buyers = await paginate(query, options);

    if ( buyers.total == 0 || buyers.error ) ctx.throw(404, "No order found");

    const { docs, total, pages } = buyers;
		let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
        result.seller = {};
        result.order = {};
				result.order.id = doc._id;
				result.order.currencyCode = doc.currencyCode;
        result.order.currencySymbol = doc.currencySymbol;
				result.order.totalAmount = doc.totalAmount;
				result.order.totalAmountBeforeDiscount = doc.totalAmountBeforeDiscount;
        result.order.orderMilestoneStatuses = doc.orderMilestoneStatuses;
        result.order.paymentDate = doc.paymentDate;
        result.order.status = doc.orderMilestoneStatuses?doc.orderMilestoneStatuses.statusDescription:'';
				result.order.countNotifications = 0;

				if(doc.buyerServiceLocation && doc.buyerServiceLocation.length>0)
        	result.order.serviceLocation = doc.buyerServiceLocation[0];
        else if(doc.sellerServiceLocation && doc.sellerServiceLocation.length>0)
          result.order.serviceLocation = doc.sellerServiceLocation[0];

        result.seller.id = doc.sellerId;
        const seller = await findOneUser({ _id: ObjectId(doc.sellerId) });
        if(seller)
        {
            result.seller.firstName = seller.firstName;
            result.seller.lastName = seller.lastName;
            result.seller.phone = seller.phone;
						result.seller.profilePic = seller.profilePic;
						if(seller.location && !result.order.serviceLocation) result.order.serviceLocation = seller.location;
        }
        const service = await findService({ _id: ObjectId(doc.serviceId) });
        if(service)
        {
						if(service.media && service.media.length>0)
					  	result.order.media = service.media[0];
            result.order.description = service.description;
        }
				if(doc.orderItems && doc.orderItems.length>0)
					result.order.priceDescription = doc.orderItems[0].description;
				result.order.notificationCount = 0;
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
