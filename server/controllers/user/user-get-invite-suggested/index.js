const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findUser } = require('../../../../stores/user');
const { paginate: paginateServices } = require('../../../../stores/service');
const { numOrders, paginate: paginateOrders } = require('../../../../stores/order');
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
          const foundUser = await findUser({ _id: doc.a.properties.mongoId, isActive:true, completedRegistration:true });

          if(foundUser && !foundUser.error && foundUser.firstName) {
            const p_numOrdersCompleted = await numOrders({ sellerId: doc.a.properties.mongoId });
            result = {
              userId: foundUser._id,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              profilePic: foundUser.profilePic,
              verified: foundUser.verified,
              numServices: 10,
              pointValue: 1,
              numOrders: (!p_numOrdersCompleted || p_numOrdersCompleted.error)?0:p_numOrdersCompleted,
              avgRating:100,
              hasFollowed: false,
              categories:["Walk dogs","Dog care"]
            };

            let serviceQuery = {
              userId: foundUser._id,
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

            const userServices = await paginateServices(serviceQuery,serviceOptions);
            if(userServices.total != 0 && !userServices.error){
              result.services = userServices.docs;
            }
          }
          return resolve(result);
      })));
      results = results.filter(result => result);
      ctx.body=results;
    } else {
      ctx.throw(404, 'No result');
    }

};
