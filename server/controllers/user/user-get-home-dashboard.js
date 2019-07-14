const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneFollowing, paginate } = require('../../../stores/following');
const { findOne: findOneUser } = require('../../../stores/user');
const { find: findService } = require('../../../stores/service');
const { numOrders, find: findOrders, paginate: paginateOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { count: countShares } = require('../../../stores/service-share');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    let body = {};

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
         buyerServiceLocation:1,
         sellerServiceLocation:1,
         serviceScheduleDate:1
       }
     };

     const upcomingServices = await paginateOrders(orderQuery,orderOptions);
     if(upcomingServices.total != 0 && !upcomingServices.error){
       const results = await Promise.all(map(upcomingServices.docs, (doc) => new Promise(async (resolve) => {
           let result = {
             orderId: doc._id,
             description: doc.description,
             location: doc.buyerServiceLocation?doc.buyerServiceLocation:doc.sellerServiceLocation,
             serviceScheduleDate: doc.serviceScheduleDate
           }

           return resolve(result);
       })));
       body.upcomingServices = results;
     }
    ctx.status = 200;
    ctx.body = body;
};
