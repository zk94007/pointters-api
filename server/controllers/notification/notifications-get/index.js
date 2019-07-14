const Promise = require('bluebird');
const { map } = require('lodash');
const { find: findNotifications, count: countNotifications, paginate: paginateNotifications } = require('../../../../stores/notification');
const { findOne: findOneService } = require('../../../../stores/service');
const { findOne: findOnePost} = require('../../../../stores/post');
const { findOne: findOneUser } = require('../../../../stores/user');
//const {pagination:{notifications:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetNotifications = 'Error in get notifications';
module.exports = async (ctx) => {
    const {query, options} = getQuery(ctx);
    const notifications = await paginateNotifications(query, options);
    const { docs, total, limit, page, pages, error } = notifications;
    if (total==0 || error) ctx.throw(404, errorInGetNotifications);

    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {
          activity: doc.description,
          id: doc._id,
          markedRead: doc.markedRead,
          type: doc.type,
          time: doc.updatedAt
        };

        const fromUser = await findOneUser({_id: ObjectId(doc.lastFromUserId)});
        if(fromUser && !fromUser.error){
          result.names = fromUser.firstName + ' ' + fromUser.lastName.substring(0,1) + '. and 5 others';
          result.profilePic = fromUser.profilePic;
        }

        switch(doc.type){
          case 'service':
            if(doc.serviceId){
              const ServiceData = await findOneService({ _id: ObjectId(doc.serviceId) });
              if(ServiceData && !ServiceData.error) {
                  result.serviceId = doc.serviceId;
                  if(ServiceData.media && ServiceData.media.length>0) result.media=ServiceData.media[0];
              }
            }
            break;
          case 'post':
            if(doc.postId){
              const postData = await findOnePost({ _id: ObjectId(doc.postId) });
              if(postData && !postData.error) {
                result.postId = doc.postId;
                if(postData.media && postData.media.length>0) result.media = postData.media[0];
              }
            }
            break;
          case 'follow':
            result.userId = doc.lastFromUserId;
            break;
          case 'fb_friend':
            result.userId = doc.lastFromUserId;
            break;
        }

        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
