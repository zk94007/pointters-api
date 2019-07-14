const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { paginate } = require('../../../stores/conversation');
const { conversationSchema } = require('../../../stores/conversation/client');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
    const { q, size, from } = ctx.query;
    const loggedInUserId = ctx.queryToFindUserById._id;
    const esResults = await conversationSchema.statics.esClient.search({
        body: {
          from : from,
          size : size,
          query: {
            match: {
              conversationTitle:q
            }
          }
        },
        index: 'conversations'
    });

    if (esResults.hits.total == 0)
        ctx.throw(404, "No conversation found");

    const transformedResults = await Promise.all(map(esResults.hits.hits, (hit) => new Promise(async (resolve) => {
          const loginUserIndex = hit._source.users.indexOf(loggedInUserId);
          hit._source.users.splice(loginUserIndex,1);
          hit._source.users = await Promise.all(map(hit._source.users, (userId) => new Promise(async (resolve) => {
              const res = {};

              if(userId != loggedInUserId){
                res.userId = userId;
                const user = await findOneUser({ _id: userId });
                if(user){
                    res.userId = userId;
                    res.firstName = user.firstName;
                    res.lastName = user.lastName;
                    res.companyName = user.companyName;
                    res.profilePic = user.profilePic;
                    res.verified = user.verified;
                }
              }
              return resolve(res);
          })));

          return resolve(hit);
      })));

      ctx.status = 200;
      ctx.body = esResults;
};
