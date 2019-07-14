const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate: paginateServices } = require('../../../../stores/service');
const { findOne: findUser } = require('../../../../stores/user');
const { count:countOrders, numOrders, find: findOrders, paginate: paginateOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const { count: countShares } = require('../../../../stores/service-share');
const { Types: { ObjectId } } = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const {query,options} = getQuery(ctx);
    const services = await paginateServices( query, options );
    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    }
    const { docs, total, limit, page, pages } = services;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          id: doc._id,
          description: doc.description,
          location: doc.location,
          promoted: doc.promoted,
          fulfillmentMethod: doc.fulfillmentMethod
        };
        if(doc.media && doc.media.length>0) result.media = doc.media[0];
        if(doc.prices && doc.prices.length>0) result.prices = doc.prices[0];

        result.numOrders = await countOrders({ serviceId: doc._id });
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
    let body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

    if(ctx.query.page && ctx.query.page=='1' && ctx.query.app=='angular') {
       body.myDashboard = {
         numOrdersThisWeek:10,
         numOffersSentThisWeek:55,
         numJobs:8,
         salesThisMonth:500,
         currencyCode:'USD',
         currencySymbol:'$'
       };
       let orderQuery = {
         $or:[
           {sellerId:ObjectId(ctx.queryToFindUserById._id)},
           {buyerId:ObjectId(ctx.queryToFindUserById._id)}],
         isActive: true,
         serviceScheduleDate: {$exists:true}
       };
       let orderOptions = {
         limit:3,
         sort:{_id:-1},
         select:{
           _id:1,
           description:1,
           location:1,
           serviceScheduleDate:1
         }
       };
       const upcomingServices = await paginateOrders(orderQuery,orderOptions);
       if(upcomingServices.total != 0 && !upcomingServices.error){
         body.upcomingServices = upcomingServices.docs;
       }
    }

    ctx.status = 200;
    ctx.body = body;
};
