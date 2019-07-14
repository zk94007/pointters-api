const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate: paginateServices } = require('../../../../stores/service');
const { findOne: findUser } = require('../../../../stores/user');
const { Types: { ObjectId } } = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const {query,options} = getQuery(ctx);
    const services = await paginateServices( query, options );
    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    }

    const { docs, total, limit, page, pages } = services;
    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          id: doc._id,
          description: doc.description,
          location: doc.location,
          promoted: doc.promoted,
          createdAt: doc.createdAt
        };

        if(doc.media && doc.media.length>0) result.media = doc.media[0];
        if(doc.prices && doc.prices.length>0) result.prices = doc.prices[0];

        const seller = await findUser({_id: doc.userId});
        if(seller && !seller.error) {
          result.seller = {
            id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            profilePic: seller.profilePic,
            verified: seller.verified
          };
        }

        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };
};
