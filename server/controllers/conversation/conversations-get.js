const Promise = require('bluebird');
const { dropWhile, map } = require('lodash');
const { paginate } = require('../../../stores/conversation');
const { findOne: findOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');

module.exports = async (ctx) => {
    const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
    const loggedInUserId = ctx.queryToFindUserById._id;
    let query = { users: { $in: [loggedInUserId] } };
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
    const conversations = await paginate(query, { page: inputPage, limit: inputLimit, sort: sort });

    if (conversations.total == 0 || conversations.error)
        ctx.throw(404, "No conversation found");

    const { docs, total, limit, page, pages } = conversations;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result._id = doc._id;
        result.conversationTitle = doc.conversationTitle;
        result.countNewMessages = doc.countNewMessages;
        result.lastMessage = doc.lastMessage;
        const loginUserIndex = doc.users.indexOf(loggedInUserId);
        doc.users.splice(loginUserIndex,1);
        result.users = await Promise.all(map(doc.users, (userId) => new Promise(async (resolve) => {
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
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
