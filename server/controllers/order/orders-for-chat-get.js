const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate, count } = require('../../../stores/order');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
    const { gt_id, lt_id, sortBy, page, limit } = ctx.query;
    if(!ctx.query) ctx.throw(404, 'User missing');

    const chatUser = await findOneUser({ _id: ObjectId(ctx.query.userId) });
    if(!chatUser || chatUser.error) ctx.throw(404, 'Invalid chat user');

    let orderQuery = {
      $or:[
        { $and:[
          {sellerId:ObjectId(ctx.queryToFindUserById._id)},
          {buyerId:ObjectId(chatUser._id)} ] },
        { $and:[
          {sellerId:ObjectId(chatUser._id)},
          {buyerId:ObjectId(ctx.queryToFindUserById._id)} ] }
        ],
      isActive: true
    };

    let orderOptions = {
      limit:3,
      sort:{_id:-1}
      /*,
      select:{
        _id:1,
        description:1,
        location:1,
        serviceScheduleDate:1,
        totalAmount:1
      }*/
    };

    if (limit) orderOptions.limit = limit;

    let sort = { _id: -1 };
    if (sortBy === '-1') orderOptions.sort._id = -1;
    else if (sortBy === '1') orderOptions.sort._id = 1;

    if (lt_id) {
        orderQuery._id = { $lt: ObjectId(lt_id) };
				orderOptions.sort = { _id: -1 };
    }
    if (gt_id) {
        orderQuery._id = { $gt: ObjectId(gt_id) };
        orderOptions.sort = { _id: 1 };
    }

    const countActiveOrders = await count(orderQuery);
    const chatOrders = await paginate(orderQuery,orderOptions);

    if (chatOrders.total == 0 || chatOrders.error ) ctx.throw(404, 'No order found');

    const { docs, total, pages } = chatOrders;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    let results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
        result.contact = {};
        result.order = {};
				result.order.id = doc._id;
        if(doc.currencyCode) result.order.currencyCode = doc.currencyCode;
        if(doc.currencySymbol) result.order.currencySymbol = doc.currencySymbol;
        if(doc.totalAmount) result.order.totalAmount = doc.totalAmount;
				if(doc.totalAmountBeforeDiscount) result.order.totalAmountBeforeDiscount = doc.totalAmountBeforeDiscount;
        if(doc.orderMilestoneStatuses) {
          result.order.orderMilestoneStatuses = doc.orderMilestoneStatuses;
          if(doc.orderMilestoneStatuses.statusDescription)
            result.order.status = doc.orderMilestoneStatuses.statusDescription;
        }
        if(doc.paymentDate) result.order.paymentDate = doc.paymentDate;
        result.order.countNotifications = 0;

        if(doc.serviceScheduleDate) result.order.serviceScheduleDate = doc.serviceScheduleDate;

        if(doc.buyerServiceLocation && doc.buyerServiceLocation.length>0)
        	result.order.serviceLocation = doc.buyerServiceLocation[0];
        else if(doc.sellerServiceLocation && doc.sellerServiceLocation.length>0)
          result.order.serviceLocation = doc.sellerServiceLocation[0];

        //set contact info
        result.contact.id = chatUser._id;
        result.contact.firstName = chatUser.firstName;
        result.contact.lastName = chatUser.lastName;
        if(chatUser.phone) result.contact.phone = chatUser.phone;
        if(chatUser.profilePic) result.contact.profilePic = chatUser.profilePic;

        if(!result.order.serviceLocation && chatUser.location) result.order.serviceLocation = chatUser.location;

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

    results = results.filter(result => result);

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
