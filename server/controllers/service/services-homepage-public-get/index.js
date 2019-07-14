const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate: paginateServices } = require('../../../../stores/service');
const { findOne: findUser } = require('../../../../stores/user');
const { count:numOrders, find: findOrders, paginate: paginateOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const { count: countShares } = require('../../../../stores/service-share');
const { find: findJobs, paginate: paginateJobs } = require('../../../../stores/request');
const { count: countOffers, findLastOne: findLastOffer } = require('../../../../stores/request-offer');
const { Types: { ObjectId } } = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const {query,options} = getQuery(ctx);
    const services = await paginateServices( query, options );
    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    }

    let { docs, total, limit, page, pages } = services;

    const popularServices = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          id: doc._id,
          description: doc.description,
          location: doc.location,
          promoted: doc.promoted,
          fulfillmentMethod: doc.fulfillmentMethod
        };
        if(doc.media && doc.media.length>0) result.media = doc.media[0];
        if(doc.prices && doc.prices.length>0) result.prices = doc.prices[0];

        result.numOrders = await numOrders({ serviceId: doc._id });
        result.avgRating = await avgRating({ serviceId: doc._id });
        result.pointValue = await countShares({ serviceId: doc._id });
        const seller = await findUser({_id: doc.userId});
        if(seller && !seller.error) {
          result.seller = {
            id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            profilePic: seller.profilePic,
            verified: seller.verified
          };
        }

        return resolve(result);
    })));

    const localServices = popularServices;

    const jobs = await paginateJobs(query, options);
    if (jobs.total == 0 || jobs.error) {
        ctx.throw(404, 'No job found');
    }

  	let { docs:jobsDocs, total:jobsTotal, limit:jobsLimit, page:jobsPage, pages:jobsPages, error:jobsError } = jobs;

    const popularJobs = await Promise.all(map(jobsDocs, (doc) => new Promise(async (resolve) => {
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

      //const offerSent = await findLastOffer({requestId: doc._id, sellerId: ctx.queryToFindUserById._id});
      //if(offerSent && !offerSent.error && offerSent.length>0) result.offerSent = offerSent;

      const user = await findUser({_id:doc.userId});
      if(user && !user.error){
        result.user = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic,
          verified: user.verified
        };
      }

  		return resolve(result);
  	})));

    const localJobs = popularJobs;

    let body = { popularServices, popularJobs, localServices, localJobs };

    ctx.status = 200;
    ctx.body = body;
};
