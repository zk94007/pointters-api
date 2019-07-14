const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneRequest } = require('../../../stores/request');
const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findOneRequestOffer, paginate, count: countRequestOffer } = require('../../../stores/request-offer');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

module.exports = async(ctx) => {
	const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
	let query = { sellerId: ObjectId(ctx.queryToFindUserById._id) };

	let sort = { _id: -1 };
	if (sortBy === '-1') sort._id = -1;
	else if (sortBy === '1') sort._id = 1;

  if (lt_id) {
      query._id = { $lt: ObjectId(lt_id) };
      sort = { requestId: -1 };
  }
  if (gt_id) {
      query._id = { $gt: ObjectId(gt_id) };
      sort = { requestId: 1 };
  }

	query.isActive = true;

	const requestOffers = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });
	if (requestOffers.total == 0 || requestOffers.error) ctx.throw(404, "Error in find request-offer");
	const { docs, total, limit, page, pages } = requestOffers;

  let lastDocId = null;
  if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

	const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
		let result = {};
		result.requestOffers = {};
		result.requestOffers.request = {};
		result.requestOffers.requester = {};
		result.requestOffers.request.requestId = doc.requestId;
		result.requestOffers.createdAt = doc.createdAt;

		const ms_in_one_day=1000*60*60*24;
		const today = new Date();
		result.requestOffers.expiresIn = Math.round((doc.createdAt.getTime() + 7*ms_in_one_day - today.getTime())/ms_in_one_day);

		const request = await findOneRequest(doc.requestId);
		if(request) {
			result.requestOffers.request.description = request.description;
			result.requestOffers.request.createdAt = request.createdAt;
			result.requestOffers.request.media = request.media;
			result.requestOffers.requester.userId = request.userId;
			result.requestOffers.request.currencyCode = request.currencyCode;
			result.requestOffers.request.currencySymbol = request.currencySymbol;
			result.requestOffers.requester.low = request.minPrice;
			result.requestOffers.requester.high = request.maxPrice;

			const numOffers  = await countRequestOffer({ requestId: request._id });
			result.requestOffers.numOffers = (numOffers && !numOffers.error)?numOffers:0;

			const offerSent = await findOneRequestOffer({requestId: request._id, sellerId: ctx.queryToFindUserById._id});
			if(offerSent && !offerSent.error) result.requestOffers.requestOfferId = offerSent._id;

			const requester = await findOneUser({_id: ObjectId(request.userId)});
			if(requester) {
				result.requestOffers.requester.firstName = requester.firstName;
				result.requestOffers.requester.lastName = requester.lastName;
				result.requestOffers.requester.profilePic = requester.profilePic;
				result.requestOffers.requester.verified = requester.verified;
			}
		}
		return resolve(result);
	})));
	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
