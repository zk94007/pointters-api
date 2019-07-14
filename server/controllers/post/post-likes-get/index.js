const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../../stores/post-like');
const { findOne: findOneUser } = require('../../../../stores/user');
const { findOne: findOneFollowing } = require('../../../../stores/following');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const likes = await paginate( query.query, query.options);
    if (likes.total == 0 || likes.error) ctx.throw(404, 'No post like found');
    const { docs, total, limit, page, pages } = likes;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {

        const foundUser = await findOneUser({ _id: doc.userId });
        let result = {};
        result.user = {};
        if(foundUser) {
            result.user.id = foundUser._id;
            result.user.firstName = foundUser.firstName;
            result.user.lastName = foundUser.lastName;
            result.user.companyName = foundUser.companyName;
            result.user.profilePic = foundUser.profilePic;
        }
        if(foundUser.location) result.user.location = foundUser.location;

        result.like = {
          createdAt: doc.createdAt
        };

        const followed = await findOneFollowing({ followFrom: ctx.queryToFindUserById._id, followTo: foundUser._id });
        result.followed = (followed && !followed.error)?true:false;


        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = {
      docs: results,
      total: total,
      limit: limit,
      page: page,
      pages: pages,
      lastDocId: lastDocId
    };

};
