const Promise = require('bluebird');
const { map } = require('lodash');
const { Types: { ObjectId } } = require('../../../databases/mongo');
const { paginate } = require('../../../stores/request');
const { findOne, count: countRequestOffer } = require('../../../stores/request-offer');
const { findOne: findUser } = require('../../../stores/user');

module.exports = async(ctx) => {
	const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
	let query = { userId: ObjectId(ctx.queryToFindUserById._id), isActive: true };

  //for chat page to display recent requests where login user is either buyer or seller
  if(ctx.query.userId){
		const chatUser = await findUser({ _id: ObjectId(ctx.query.userId) });
		if(!chatUser || chatUser.error) ctx.throw(404, 'Invalid chat user');

		query = {
			$or:[
				{ $and:[
					{sellerId:ObjectId(ctx.queryToFindUserById._id)},
					{userId:ObjectId(chatUser._id)} ] },
				{ $and:[
					{sellerId:ObjectId(chatUser._id)},
					{userId:ObjectId(ctx.queryToFindUserById._id)} ] }
				],
			isActive: true
		};
	}

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
console.log(query);
  const foundUser = await findUser({_id:ctx.queryToFindUserById._id});

	const requests = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });
	if (requests.total == 0 || requests.error) ctx.throw(404, "Error in find request");
	const { docs, total, limit, page, pages } = requests;

  let lastDocId = null;
  if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

	const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
		let result = {};
		const ms_in_one_day=1000*60*60*24;
		const today = new Date();
		result.requests = {};
		result.requests.id = doc._id;
		result.requests.description = doc.description;
		result.requests.createdAt = doc.createdAt;
		result.requests.media = doc.media;
		if(!doc.media || doc.media.length==0) result.requests.media = foundUser.profilePic;
		const numOffers = await countRequestOffer({ requestId: doc._id });
		result.requests.numOffers = (numOffers && !numOffers.error)?numOffers:0;
		const numNewOffers = await countRequestOffer({ requestId: null });
		result.requests.numNewOffers = (numNewOffers && !numNewOffers.error)?numNewOffers:0;
		result.requests.currencyCode = doc.currencyCode;
		result.requests.currencySymbol = doc.currencySymbol;
		result.requests.low = doc.minPrice;
		result.requests.high = doc.maxPrice;
		result.requests.expiresIn = Math.round((doc.createdAt.getTime() + 7*ms_in_one_day - today.getTime())/ms_in_one_day);
		return resolve(result);
	})));
	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
