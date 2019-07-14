const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneOffer } = require('../../../stores/offer');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneRequest } = require('../../../stores/request');
const { paginate } = require('../../../stores/message');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { count: countShares } = require('../../../stores/service-share');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

module.exports = async (ctx) => {
	const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { conversationId: ctx.params.idConversation };
    let sort = { _id : -1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { conversationId: -1 };
    }
    const messages = await paginate(query, { page: inputPage, limit: inputLimit, sort: sort });

    if (messages.total == 0 || messages.error)
        ctx.throw(404, "No message found");

    const { docs, total, limit, page, pages } = messages;
		let lastDocId = null;
		if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.result = {};

				//populate result with message
				result.result.message = {};
				result.result.message.id = doc._id;
        result.result.message.createdAt = doc.createdAt;
        result.result.message.updatedAt = doc.updatedAt;
        result.result.message.messageText = doc.messageText;
        result.result.message.media = doc.media;

				//populate result with user
				if(doc.userId){
					result.result.user = {};
					result.result.user.userId = doc.userId;
					const user = await findOneUser({ _id: doc.userId });
					if(user) {
							result.result.user.firstName = user.firstName;
							result.result.user.lastName = user.lastName;
							result.result.user.companyName = user.companyName;
							result.result.user.profilePic = user.profilePic;
							result.result.user.verified = user.verified;
					}
				}

				//populate result with service
				if(doc.serviceId){
					result.result.message.service = {};
	        result.result.message.service.serviceId = doc.serviceId;
	        const service = await findOneService({ _id: doc.serviceId });
	        if(service) {
	            result.result.message.service.description = service.description;
							if(service.media) result.result.message.service.media = service.media[0];
	            if(service.prices && service.prices[0]) result.result.message.service.price = service.prices[0];
							const seller = await findOneUser({ _id: service.userId });
							if(seller){
								result.result.message.service.seller = {
									firstName: seller.firstName,
									lastName: seller.lastName,
									location: seller.location
								};
							}
							result.result.message.service.numOrders = await numOrders({ serviceId: doc.serviceId });
							result.result.message.service.avgRating = await avgRating({ serviceId: doc.serviceId });
							result.result.message.service.pointValue = await countShares({ serviceId: doc.serviceId });
	        }
				}

				//populate result with offer
				if(doc.offerId){
					result.result.message.offer = {};
	        result.result.message.offer.offerId = doc.offerId;
	        const offer = await findOneOffer({ _id: doc.offerId });
	        if(offer) {
	            result.result.message.offer.description = offer.description;
							if(offer.media && offer.media.length>0) result.result.message.offer.media = offer.media[0];
							result.result.message.offer.currencyCode = offer.currencyCode;
		          result.result.message.offer.currencySymbol = offer.currencySymbol;
		          result.result.message.offer.price = offer.price;
		          result.result.message.offer.priceWithoutDiscount = offer.priceWithoutDiscount;
	            result.result.message.offer.workDuration = offer.workDuration;
	            result.result.message.offer.workDurationUom = offer.workDurationUom;

							const seller = await findOneUser({ _id: offer.sellerId });
		          if(seller){
		            result.result.message.offer.seller = {
		              firstName: seller.firstName,
		              lastName: seller.lastName,
		              location: seller.location
		            };
		          }

							//populate linked service
							if(offer.serviceId){
								result.result.message.offer.service = {};
				        result.result.message.offer.service.serviceId = offer.serviceId;
				        const linkedService = await findOneService({ _id: offer.serviceId });
				        if(linkedService) {
				            result.result.message.offer.service.description = linkedService.description;
										if(linkedService.media) result.result.message.offer.service.media = linkedService.media[0];
				            if(linkedService.prices && linkedService.prices[0]) result.result.message.offer.service.price = linkedService.prices[0];
										const linkedSeller = await findOneUser({ _id: linkedService.userId });
										if(linkedSeller){
											result.result.message.offer.service.seller = {
												firstName: linkedSeller.firstName,
												lastName: linkedSeller.lastName
											};
										}

										result.result.message.offer.service.numOrders = await numOrders({ serviceId: doc.serviceId });
										result.result.message.offer.service.avgRating = await avgRating({ serviceId: doc.serviceId });
										result.result.message.offer.service.pointValue = await countShares({ serviceId: doc.serviceId });

										//if offer has no media, then populate offer image from linked service or seller
										if((!offer.media || offer.media.length<1) && offer.serviceId){
											if(linkedService.media && linkedService.media.length>0){
												result.result.message.offer.media = linkedService.media[0];
											}else {
												result.result.message.offer.media = linkedSeller.profilePic;
											}
										}
				        }
							}
	        }
				}

				//populate result with request
				if(doc.requestId){
					result.result.message.request = {};
	        result.result.message.request.requestId = doc.requestId;
	        const request = await findOneRequest({ _id: doc.requestId });
	        if(request) {
	            result.result.message.request.description = request.description;
	            if(request.media && request.media.length>0) result.result.message.request.media = request.media[0];
							result.result.message.request.currencyCode = request.currencyCode;
							result.result.message.request.currencySymbol = request.currencySymbol;
	            result.result.message.request.minPrice = request.minPrice;
	            result.result.message.request.maxPrice = request.maxPrice;
	            result.result.message.request.scheduleDate = request.scheduleDate;

							if(request.serviceId){
								const linkedService = await findOneService({ _id: request.serviceId });
								result.result.message.request.serviceName = linkedService.description;
							}
	        }
				}

        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
