const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { numOrders } = require('../../../stores/order');
const getServiceReviewQuery = require('./service-review-get/get-query');
const { avgRating, find: findServiceReviews, count: countServiceReviews, paginate: paginateServiceReviews } = require('../../../stores/service-review');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const queryToFindService = ( { _id: ctx.params.idService, isActive: true });
    const service = await findOneService(queryToFindService);
    let result = {};
    result.seller = {};
    result.service = {};

    if (!service || service.error) ctx.throw(404, errorMessage);

    result.service.id = service._id;
    result.service.category = service.category;
    result.service.tagline = service.tagline;
    result.service.description = service.description;
    result.service.fulfillmentMethod = service.fulfillmentMethod;
    result.service.location = service.location;
    result.service.media = service.media;
    result.service.prices = service.prices;
    result.service.promoted = service.promoted;
    result.service.flaggedInappropriateByUser = false;
    result.seller.userId = service.userId;
    const user = await findOneUser({ _id: service.userId });
    if(user)
    {
        result.seller.companyName = user.companyName;
        result.seller.firstName = user.firstName;
        result.seller.lastName = user.lastName;
        result.seller.phone = user.phone;
        result.seller.profilePic = user.profilePic;
        result.seller.verified = user.verified;
    }

    //const p_avgOnTime = await avgOnTime({ sellerId: userId });
    //const p_avgQuality = await avgQuality ({ sellerId: userId });
    //const p_avgRating = await avgRating({ serviceId: service._id });
    //const p_numOrdersCompleted = await numOrders({ serviceId: service._id });
    //const p_numLikes = await numLikes({ sellerId: userId });
    //const p_numWatching  = await numWatching({ sellerId: userId });

    result.serviceMetrics = {
      avgOnTime: 99,
      avgQuality: 5,//(!p_avgQuality || p_avgQuality.error)?'NA':p_avgQuality,
      numOrdersCompleted: 100, //(!p_numOrdersCompleted || p_numOrdersCompleted.error)?'NA':p_numOrdersCompleted,
      avgResponseTime: 1,
      pointValue: 1,
      numLikes: 100, //(!p_numLikes || p_numLikes.error)?'NA':p_numLikes,
      numWatching: 100, //(!p_numWatching || p_avgOnTime.error)?'NA':p_numWatching,
      avgRating:100,
      avgWillingToBuyAgain:100
    };

    const {query,options} = getServiceReviewQuery(ctx);
    const serviceReviews = await paginateServiceReviews( query, options );
    if (!serviceReviews || serviceReviews.error) ctx.throw(404, reviewsDoesNotExists);

    const { docs, total, limit, page, pages } = serviceReviews;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const serviceReviewsMapped = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          comment: doc.comment,
          createdAt: doc.createdAt,
          qualityOfService: doc.qualityOfService,
          overallRating: doc.overallRating,
          willingToBuyServiceAgain: doc.willingToBuyServiceAgain,
          onTime:true
        };

        const user = await findOneUser({_id: doc.userId});
        if(user && !user.error) {
          result.userId = user._id;
          result.firstName = user.firstName;
          result.lastName = user.lastName;
          result.profilePic = user.profilePic;
          result.verified = user.verified;
        }
        return resolve(result);
    })));

    if(serviceReviewsMapped && !serviceReviewsMapped.error)
      result.reviews = serviceReviewsMapped;

    ctx.status = 200;
    ctx.body = { result };
};
