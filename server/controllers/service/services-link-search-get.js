const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { storeSchema } = require('../../../stores/service/client');
const { findOne: findOneService } = require('../../../stores/service');
const { numOrders } = require('../../../stores/order');
const { count: countShares } = require('../../../stores/service-share');
const { avgRating } = require('../../../stores/service-review');
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
            match: {
              description:q
            }
          }
        },
        index: 'services'
    });

    if (esResults.hits.total == 0)
        ctx.throw(404, "No service found");

    const transformedResults = await Promise.all(map(esResults.hits.hits, (hit) => new Promise(async (resolve) => {
        const serviceFound = await findOneService({_id:hit._id});

        if(serviceFound && !serviceFound.error){
          const seller = await findOneUser({_id:serviceFound.userId});
          if(seller && !seller.error) {
            hit._source.seller={
                id: seller._id,
                firstName: seller.firstName,
                lastName: seller.lastName
            };
          }
        }

        const dataNumOrders = await numOrders({serviceId: hit._id});
        const dataAvgRating = await avgRating({serviceId: hit._id});
        const dataPointValue = await countShares({serviceId: hit._id});
        hit._source.id=hit._id;
        let serviceResult = {
          service: hit._source,
          numOrders: dataNumOrders,
          avgRating: dataAvgRating,
          pointValue: dataPointValue
        };
        return resolve(serviceResult);
    })));
    esResults.hits.hits = transformedResults;
    ctx.status = 200;
    ctx.body = {
      docs:transformedResults
    };
};
