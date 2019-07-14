const Promise = require('bluebird');
const { map } = require('lodash');
const { find: findJobs, paginate: paginateJobs } = require('../../../../stores/request');
const { count: countOffers, findLastOne: findLastOffer } = require('../../../../stores/request-offer');
const { findOne: findOneUser } = require('../../../../stores/user');
const {pagination:{requestOffers:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMsg = 'Error in getting explore jobs';

module.exports = async (ctx) => {
    const {query, options} = getQuery(ctx);
    const jobs = await paginateJobs(query, options);
  	const { docs, total, limit, page, pages, error } = jobs;
  	if (total == 0 || error) ctx.throw(404, errorMsg);
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
  		let result = {
        createdAt: doc.createdAt,
        description: doc.description,
        id: doc._id,
        updatedAt: doc.updatedAt
      };

      if(doc.media && doc.media.length>0) result.media = doc.media[0];
      if(doc.location) result.location = doc.location;
      if(doc.scheduleDate) result.scheduleDate = doc.scheduleDate;
      result.currencyCode = doc.currencyCode;
      result.currencySymbol = doc.currencySymbol;
      if(doc.minPrice) result.minPrice = doc.minPrice;
      if(doc.maxPrice) result.maxPrice = doc.maxPrice;
      if(doc.currencyCode) result.currencyCode = doc.currencyCode;
      if(doc.currencySymbol) result.currencySymbol = doc.currencySymbol;
      if(doc.expirationDate) result.expirationDate = doc.expirationDate;
      else {
        const updatedAt = new Date(doc.updatedAt);
        let expiredDate = new Date(updatedAt);
        expiredDate.setDate(updatedAt.getDate() + 7);
        result.expirationDate = expiredDate;
      }

      const numOffers = await countOffers({requestId: doc._id});
      result.numOffers = (numOffers && !numOffers.error)?numOffers:0;

      const offerSent = await findLastOffer({requestId: doc._id, sellerId: ctx.queryToFindUserById._id});
      if(offerSent && !offerSent.error && offerSent.length>0) result.offerSent = offerSent;

      const user = await findOneUser({_id:doc.userId});
      if(user && !user.error){
        result.user = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic,
          verified: user.verified
        };
        if(!result.location && user.location) result.location = user.location;
      }

  		return resolve(result);
  	})));

  	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
