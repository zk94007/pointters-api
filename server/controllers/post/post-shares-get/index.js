const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../../stores/post-share');
const { findOne: findOneUser } = require('../../../../stores/user');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const shares = await paginate( query.query, query.options);
    if (shares.total == 0 || shares.error) ctx.throw(404, 'No post share found');
    const { docs, total, limit, page, pages } = shares;
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

        result.share = {
          createdAt: doc.createdAt
        };

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
