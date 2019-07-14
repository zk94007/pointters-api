const Promise = require('bluebird');
const { map } = require('lodash');
const { create: createPost } = require('../../../stores/post');
const { create: createPostTag } = require('../../../stores/post-tag');
const { findOne: findPost, paginate: paginatePost } = require('../../../stores/post');
const { paginate: paginatePostComment, count: countComment } = require('../../../stores/post-comment');
const { count: countLike } = require('../../../stores/post-like');
const { find: findTags } = require('../../../stores/post-tag');
const { count: countShare } = require('../../../stores/post-share');
const { findOne: findOneLike } = require('../../../stores/post-like');
const { findOne: findUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const {pagination:{postComments:limit}} = require('../../../config');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const errorMessage = 'Error in create post';
const errorMessagePostTag = 'Error in create post tag';

module.exports = async(ctx) => {
    let postDoc = {
      userId: ctx.state.user.id
    };

    if(ctx.request.body.message) postDoc.message = ctx.request.body.message;
    if(ctx.request.body.media) postDoc.media = ctx.request.body.media;
    if(ctx.request.body.serviceId) postDoc.serviceId = ctx.request.body.serviceId;
    postDoc.type = ctx.request.body.serviceId?"service":"post";
    const post = await createPost(postDoc);

    if (!post || post.error) ctx.throw(500, errorMessage);

    if(ctx.request.body.tags && ctx.request.body.tags.length>0) {
      post.tags=[];
      const result = await Promise.all(map(ctx.request.body.tags, (doc) => new Promise(async (resolve) => {
          let postpostResult = {
            postId: post._id,
            type: doc.type
          };

          if(doc.type=='user') postpostResult.taggedUserId = doc.id;
          if(doc.type=='service') postpostResult.taggedServiceId = doc.id;

          const postTag = await createPostTag(postpostResult);
          if (!postTag || postTag.error) ctx.throw(500, errorMessagePostTag);

          post.tags.push(postTag);
          return resolve(postpostResult);
      })));
    }

    const countLikes = await countLike({ postId: post._id });
    const countComments = await countComment({ postId: post._id });
    const countShares = await countShare({ postId: post._id });

    let postResult = {};

    postResult.post = {
      id: post._id,
      type: post.type,
      message: post.message,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      countLikes: (countLikes && !countLikes.error)?countLikes:0,
      countComments: (countComments && !countComments.error)?countComments:0,
      countShares: (countShares && !countShares.error)?countShares:0
    };

    if(post.media && post.media.length>0) postResult.post.media = post.media;

    const foundTags = await findTags({postId:post._id});
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
            if(foundTaggedService.description) tagResult.description=foundTaggedService.description.substring(1,100);
            if(foundTaggedService.location) tagResult.location = foundTaggedService.location;
            if(foundTaggedService.media && foundTaggedService.media.length>0) tagResult.media = foundTaggedService.media[0];
            tagResult.prices = foundTaggedService.prices;

            tagResult.pointValue = 1;
            tagResult.numOrders = await numOrders({ serviceId: tagDoc.taggedServiceId });
            tagResult.avgRating = await avgRating({ serviceId: tagDoc.taggedServiceId });

            const seller = await findUser({ _id: foundTaggedService.userId });

            if(seller & !seller.error){
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

      if(tagResults && tagResults.length>0) postResult.post.tags = tagResults;
    }
    if(post.serviceId){

      const postService = await findService({ _id: post.serviceId });
      if(postService && !postService.error){
        postResult.service={};
        if(postService.description) postResult.service.description=postService.description.substring(1,300);
        if(postService.location) postResult.service.location = postService.location;
        if(postService.media && postService.media.length>0) postResult.service.media = postService.media[0];
        postResult.service.prices = postService.prices;

        postResult.service.pointValue = 1;
        postResult.service.numOrders = await numOrders({ serviceId: post.serviceId });
        postResult.service.avgRating = await avgRating({ serviceId: post.serviceId });
      }
    }

    const foundUser = await findUser({ _id: ctx.state.user.id });
    if(foundUser && !foundUser.error){
      postResult.user = {
        id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        companyName: foundUser.companyName,
        profilePic: foundUser.profilePic
      };
    }

    const postComments = await paginatePostComment({ postId: post._id }, { sort: { _id: -1 }, limit: 2 } );

    if(postComments && !postComments.error && postComments.total>0) {
      const commentResults = await Promise.all(map(postComments.docs, (commentDoc) => new Promise(async (resolve) => {
        let commentResult = {};
        const foundCommentUser = await findUser({ _id: commentDoc.userId });
        if(foundCommentUser && !foundCommentUser.error)
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

        return resolve(commentResult);
      })));

      if(commentResults && !commentResults.error) postResult.comments = commentResults;
    }

    const liked = await findOneLike({postId: post._id, userId: ctx.queryToFindUserById._id});
    postResult.liked = (liked && !liked.error)?true:false;

    ctx.body = postResult;
};
