const Promise = require('bluebird');
const { map } = require('lodash');
const { find: findOffer, paginate: paginateOffers } = require('../../../../stores/request-offer');
const { findOne: findOneUser } = require('../../../../stores/user');
const { findOne: findOneService } = require('../../../../stores/service');
const { avgRating } = require('../../../../stores/service-review');
const { count: countShares } = require('../../../../stores/service-share');
const { numOrders } = require('../../../../stores/order');
const {pagination:{requestOffers:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorInGetWatching = 'Error in getting request offers';

module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const requestOffers = await paginateOffers(query.query, query.options);
  	if (requestOffers.total == 0 || requestOffers.error) ctx.throw(404, errorInGetWatching);
  	const { docs, total, limit, page, pages } = requestOffers;

    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
  		let result = {
        requestId: doc.requestId,
        offerId: doc._id,
        currencySymbol: doc.currencySymbol,
        currencyCode: doc.currencyCode,
        description: doc.description,
        price: doc.price,
        workDuration: doc.workDuration,
        workDurationUom: doc.workDurationUom,
        fulfillmentMethod: doc.fulfillmentMethod
      };

      if(doc.serviceId) result.serviceId = doc.serviceId;
      if(doc.media && doc.media.length>0) result.media = doc.media[0];
      if(doc.location) result.location = doc.location;
      if(doc.address) result.address = doc.address;
      if(doc.parcel) result.parcel = doc.parcel;

      const ms_in_one_day=1000*60*60*24;
      const today = new Date();
      console.log(doc);
      result.expiresIn = Math.round((doc.updatedAt.getTime() + 7*ms_in_one_day - today.getTime())/ms_in_one_day);
      result.expired = (result.expiresIn<0)?true:false;

      const ServiceData = await findOneService({ _id: ObjectId(result.serviceId) });
      if(ServiceData)
      {
        result.service = {
          description: ServiceData.description
        };
        result.service.prices = [ServiceData.prices[0]];
        result.service.pointValue = await countShares({serviceId:result.serviceId});
        result.service.numOrders = await numOrders({serviceId:result.serviceId});
        result.service.avgRating = await avgRating({serviceId:result.serviceId});
        if (ServiceData.location && ServiceData.fulfillmentMethod.local) result.service.location = ServiceData.location[0];
        if (ServiceData.media) result.service.media = ServiceData.media[0];

        //populate location and media from linked service
        if ((!result.location || !result.media) && result.serviceId) {
           if (!result.location && ServiceData.location) result.location=ServiceData.location[0];
           if ((!result.media || result.media.length < 1) && ServiceData.media) result.media=ServiceData.media[0];
        }
      }

      const user = await findOneUser({_id:doc.sellerId});
      if(user && !user.error){
        result.seller = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic
        };

        if(!result.location) result.location = user.location;
      }

  		return resolve(result);
  	})));

  	ctx.status = 200;

    if(ctx.params.idOffer){
      ctx.body = results[0];
    }else{
      ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
    }

};
