const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { storeSchema } = require('../../../stores/service/client');
const { paginate: paginateServices } = require('../../../stores/service');
const { numOrders, paginate: paginateOrders } = require('../../../stores/order');
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
            bool: {
              should: [
                  { match: { firstName:q } },
                  { match: { lastName:q } }
                ]
            }
            /*match: {
              description:q
            }*/
          }
        },
        index: 'users'
    });

    if (esResults.hits.total == 0)
        ctx.throw(404, "Not found");

    let results = [];
    const transformedResults = await Promise.all(map(esResults.hits.hits, (hit) => new Promise(async (resolve) => {
        let result={};

        const user = await findOneUser({_id:hit._id});
        if(user && !user.error){
          result={
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              profilePic: user.profilePic,
              verified: user.verified,
              numServices: 10,
              pointValue: 1,
              numOrders: 5,
              avgRating:100,
              hasFollowed: false,
              categories:["Walk dogs","Dog care"]
          };

          let serviceQuery = {
            userId: user._id,
            isActive: true
          };
          let serviceOptions = {
            limit:4,
            sort:{_id:-1},
            select:{
              _id:1,
              category:1
            }
          };

          const userServices = await paginateOrders(serviceQuery,serviceOptions);
          if(userServices.total != 0 && !userServices.error){
            result.services = userServices.docs;
          }

          results.push(result);
        }

        return resolve(hit);
      })));

    ctx.status = 200;
    ctx.body = results;
};
