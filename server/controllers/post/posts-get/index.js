const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findPost, paginate: paginatePost } = require('../../../../stores/post');
const { paginate: paginatePostComment, count: countComment } = require('../../../../stores/post-comment');
const { count: countLike } = require('../../../../stores/post-like');
const { find: findTags } = require('../../../../stores/post-tag');
const { count: countShare } = require('../../../../stores/post-share');
const { findOne: findOneLike } = require('../../../../stores/post-like');
const { findOne: findUser } = require('../../../../stores/user');
const { findOne: findService } = require('../../../../stores/service');
const { numOrders } = require('../../../../stores/order');
const { avgRating } = require('../../../../stores/service-review');
const {pagination:{postComments:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const postModel = require('../../../../stores/post/client');

module.exports = async (ctx) => {
    let query = getQuery(ctx);
    const cypher = Promise.promisify( postModel.cypherQuery );
    const docs = await cypher({query: query});

    if(docs && docs.length>0){
      let results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
          let result = {};
          const foundPost = await findPost({ _id: doc.p.properties.mongoId });
          if(foundPost && !foundPost.error) {
            const foundUser = await findUser({ _id: foundPost.userId });
            if(foundUser && !foundUser.error){
              result.user = {
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                companyName: foundUser.companyName,
                profilePic: foundUser.profilePic
              };
            }
            const liked = await findOneLike({postId: foundPost._id, userId: ctx.queryToFindUserById._id});
            result.liked = (liked && !liked.error)?true:false;
            const countLikes = await countLike({ postId: foundPost._id });
            const countComments = await countComment({ postId: foundPost._id });
            const countShares = await countShare({ postId: foundPost._id });
            result.post = {
              id: foundPost._id,
              type: foundPost.type,
              message: foundPost.message,
              createdAt: foundPost.createdAt,
              updatedAt: foundPost.updatedAt,
              countLikes: countLikes,
              countComments: countComments,
              countShares: countShares
            };
            if(foundPost.media && foundPost.media.length>0) result.post.media = foundPost.media;

            const foundTags = await findTags({postId:foundPost._id});
            if(foundTags && !foundTags.error){
              const tagResults = await Promise.all(map(foundTags, (tagDoc) => new Promise(async (resolve) => {
                let tagResult = {};
                if(tagDoc.type=='service'){
                  const foundTaggedService = await findService({ _id: tagDoc.taggedServiceId });
                  tagResult = {
                    type:tagDoc.type
                  };
                  if(foundTaggedService && !foundTaggedService.error){
                    tagResult.serviceId = tagDoc.taggedServiceId;
                    if(foundTaggedService.description) tagResult.description=foundTaggedService.description.substring(0,100);
                    if(foundTaggedService.location) tagResult.location = foundTaggedService.location;
                    if(foundTaggedService.media && foundTaggedService.media.length>0) tagResult.media = foundTaggedService.media[0];
                    tagResult.prices = foundTaggedService.prices;

                    tagResult.pointValue = 1;
                    tagResult.numOrders = await numOrders({ serviceId: tagDoc.taggedServiceId });
                    tagResult.avgRating = await avgRating({ serviceId: tagDoc.taggedServiceId });

                    const seller = await findUser({ _id: foundTaggedService.userId });
                    if(seller && !seller.error){
                      tagResult.firstName = seller.firstName;
                      tagResult.lastName = seller.lastName;
                    }
                  }
                } else{
                  const foundTaggedUser = await findUser({ _id: tagDoc.taggedUserId });
                  if(foundTaggedUser && !foundTaggedUser.error){
                    tagResult = {
                      type:tagDoc.type,
                      userId:tagDoc.taggedUserId,
                      firstName:foundTaggedUser.firstName,
                      lastName:foundTaggedUser.lastName,
                      profilePic:foundTaggedUser.profilePic,
                      location:foundTaggedUser.location
                    };
                  }
                }

                return resolve(tagResult);
              })));

              if(tagResults && tagResults.length>0) result.post.tags = tagResults;
            }

           if(foundPost.serviceId){
              const postService = await findService({ _id: foundPost.serviceId });
              if(postService && !postService.error){
                result.service={
                  id:postService._id
                };
                if(postService.description) result.service.description=postService.description.substring(0,300);
                if(postService.location) result.service.location = postService.location;
                if(postService.media && postService.media.length>0) result.service.media = postService.media[0];
                result.service.prices = postService.prices;

                result.service.pointValue = 1;
                result.service.numOrders = await numOrders({ serviceId: foundPost.serviceId });
                result.service.avgRating = await avgRating({ serviceId: foundPost.serviceId });
              }
            }

            const postComments = await paginatePostComment({ postId: foundPost._id }, { sort: { _id: -1 }, limit: 2 } );
            if(postComments && postComments.total>0) {
              const commentResults = await Promise.all(map(postComments.docs, (commentDoc) => new Promise(async (resolve) => {
                let commentResult = {};
                const foundCommentUser = await findUser({ _id: commentDoc.userId });
                if(foundCommentUser && !foundCommentUser.error){
                  commentResult = {
                    comment: commentDoc.comment,
                    updatedAt: commentDoc.updatedAt,
                    user: {
                      userId: commentDoc.userId,
                      firstName: foundCommentUser.firstName,
                      lastName: foundCommentUser.lastName,
                      profilePic: foundCommentUser.profilePic
                    }
                  };
                }

                return resolve(commentResult);
              })));
              if(commentResults && !commentResults.error) {
                result.comments = commentResults;
              }
            }

          return resolve(result);
        } else return resolve();

      })));

      results = results.filter(result => result);
      ctx.body=results;
    } else {
      ctx.throw(404, 'No result');
    }

};
