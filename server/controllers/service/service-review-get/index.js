const Promise = require('bluebird');
const { map } = require('lodash');
const { find: findServiceReview, count, paginate } = require('../../../../stores/service-review');
const { findOne: findUser } = require('../../../../stores/user');
const {pagination:{serviceReviews:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const reviewsDoesNotExists = 'No review found';
module.exports = async (ctx) => {
    const {query,options} = getQuery(ctx);
    const serviceReviews = await paginate( query, options );
    if (!serviceReviews || serviceReviews.error) ctx.throw(404, reviewsDoesNotExists);

    const { docs, total, limit, page, pages } = serviceReviews;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          comment: doc.comment,
          createdAt: doc.createdAt,
          qualityOfService: doc.qualityOfService,
          overallRating: doc.overallRating,
          willingToBuyServiceAgain: doc.willingToBuyServiceAgain,
          onTime: true
        };

        const user = await findUser({_id: doc.userId});
        if(user && !user.error) {
          result.userId = user._id;
          result.firstName = user.firstName;
          result.lastName = user.lastName;
          result.profilePic = user.profilePic;
          result.verified = user.verified;
        }
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
