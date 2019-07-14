const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { storeSchema } = require('../../../stores/service/client');
const { findOne: findOneService } = require('../../../stores/service');
const { numOrders } = require('../../../stores/order');
const { count: countShares } = require('../../../stores/service-share');
const { avgRating } = require('../../../stores/service-review');
const { avgQuality  } = require('../../../stores/service-review');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
    const { q, size, from } = ctx.query;
    const loggedInUserId = ctx.queryToFindUserById._id;
    const esResults = await storeSchema.statics.esClient.search({
        body: {
          from : from,
          size : size,
          query: {
            bool: {
              should: [
                  { match: { description:q } },
                  { match: { firstName:q } },
                  { match: { lastName:q } }
                ]
            }
            /*match: {
              description:q
            }*/
          }
        },
        index: 'services,users'
    });

    if (esResults.hits.total == 0)
        ctx.throw(404, "No data found");

    let results = [];
    const transformedResults = await Promise.all(map(esResults.hits.hits, (hit) => new Promise(async (resolve) => {
        let result={};
        if(hit._type=='service'){
          const serviceDoc = await findOneService({_id: hit._id});
          if(serviceDoc && !serviceDoc.error){
            const seller = await findOneUser({_id:serviceDoc.userId});
            result={
              type: 'service',
              service: {
                id: hit._id,
                description: serviceDoc.description,
                prices: serviceDoc.prices,
                location: serviceDoc.location,
                fulfillmentMethod: serviceDoc.fulfillmentMethod
              }
            };
            if(serviceDoc.media) result.service.media=serviceDoc.media;
            if(seller && !seller.error) {
              result.service.seller={
                  id: seller._id,
                  firstName: seller.firstName,
                  lastName: seller.lastName
              };
            }

            result.service.numOrders = await numOrders({serviceId: hit._id});
            result.service.avgRating = await avgRating({serviceId: hit._id});
            result.service.pointValue = await countShares({serviceId: hit._id});
          }
        }else{
          const user = await findOneUser({_id:hit._id});
          if(user && !user.error){
            const p_avgRating = await avgRating ({ sellerId: user._id });
            const p_numOrdersCompleted = await numOrders({ sellerId: user._id });
            const p_numShares = await countShares({sellerId: user._id});

            result={
              type: 'user',
              user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePic: user.profilePic,
                location: user.location,
                verified: user.verified,
                numOrders: p_numOrdersCompleted,
                avgRating: p_avgRating,
                pointValue: p_numShares
              }
            };
            if(user.description) result.user.description = user.description;
            result.user.categories = ["Walks dog","Dog care"];

          }
        }
        if(result.type) {
          results.push(result);
        }
        return resolve(hit);
      })));

    if (results.length == 0)
        ctx.throw(404, "No data found");

    ctx.status = 200;
    ctx.body = results;
};
