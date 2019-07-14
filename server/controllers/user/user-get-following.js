const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/following');
const { findOne: findOneUser } = require('../../../stores/user');
const { find: findService } = require('../../../stores/service');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
    let query = { followFrom: ctx.queryToFindUserById._id };
    let sort = { _id: -1 };
    if (sortBy === '-1') sort._id = -1;
    else if (sortBy === '1') sort._id = 1;

    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
        sort = { _id: -1 };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: 1 };
    }

    const tempFollowFrom = await findOneUser({ _id: ctx.queryToFindUserById._id });
    const followers = await paginate( query, { page: inputPage, limit: inputLimit, sort: sort });
    if (followers.total == 0 || followers.error) ctx.throw(404, 'No following found');
    const { docs, total, limit, page, pages } = followers;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    let results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const tempFollowTo = await findOneUser({ _id: doc.followTo });
        let result;
        if(tempFollowTo && !tempFollowTo.error && tempFollowTo.firstName){
          result = {};
          result.followTo = {};
          result.followTo.id = tempFollowTo._id;
          result.followTo.firstName = tempFollowTo.firstName;
          result.followTo.lastName = tempFollowTo.lastName;
          if(tempFollowTo.companyName) result.followTo.companyName = tempFollowTo.companyName;
          result.followTo.profilePic = tempFollowTo.profilePic;

          const servicesFollowTo = await findService({ userId: doc.followTo});
          result.categories = [];
          let count = 0;
          for (let i = 0; i < servicesFollowTo.length; i ++) {
              if(i == 0) {
                  if(servicesFollowTo[0].category && servicesFollowTo[0].category.name){
                    result.categories[0] = servicesFollowTo[0].category.name;
                    count ++;
                  }
              }else{
                  for (let j = 0; j < count; j ++) {
                    if(servicesFollowTo[i].category && servicesFollowTo[i].category.name){
                      if(result.categories[j] != servicesFollowTo[i].category.name) {
                          result.categories[count] = servicesFollowTo[i].category.name;
                          count ++;
                          break;
                      }
                    }
                  }
              }
              if(count == 3)
                  break;
          }

        }
        return resolve(result);
    })));

    results = results.filter(result => result);
    const followFrom = {};
    followFrom.id = ctx.queryToFindUserById._id;
    if(tempFollowFrom) {
        followFrom.firstName = tempFollowFrom.firstName;
        followFrom.lastName = tempFollowFrom.lastName;
        if(tempFollowFrom.companyName) followFrom.companyName = tempFollowFrom.companyName;
        followFrom.profilePic = tempFollowFrom.profilePic;
    }
    ctx.status = 200;
    ctx.body = { docs: results, followFrom: followFrom, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
