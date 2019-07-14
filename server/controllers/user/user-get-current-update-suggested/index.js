const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findUser } = require('../../../../stores/user');
const { findOne: findService } = require('../../../../stores/service');
const { numOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const userModel = require('../../../../stores/user/client');

module.exports = async (ctx) => {
    let query = getQuery(ctx);
    const cypher = Promise.promisify( userModel.cypherQuery );
    const docs = await cypher({query: query});

    if(docs && docs.length>0){
      let results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
          let result;
          const foundUser = await findUser({ _id: doc.a.properties.mongoId });
          if(foundUser && !foundUser.error && foundUser.firstName) {
            const p_numOrdersCompleted = await numOrders({ sellerId: doc.a.properties.mongoId });
            result = {
              userId: foundUser._id,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              companyName: foundUser.companyName,
              profilePic: foundUser.profilePic,
              verified: foundUser.verified,
              pointValue: 1,
              numOrdersCompleted: (!p_numOrdersCompleted || p_numOrdersCompleted.error)?0:p_numOrdersCompleted,
              avgRating:100,
              categories:["Walk dogs","Dog care"]
            };

            if(foundUser.location) result.location = foundUser.location;
            if(foundUser.description) result.description = foundUser.description.substring(1,30);
          }
          return resolve(result);
      })));
      results = results.filter(result => result);
      ctx.body=results;
    } else {
      ctx.throw(404, 'No result');
    }

};
