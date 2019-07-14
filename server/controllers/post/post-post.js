const Promise = require('bluebird');
const { map } = require('lodash');
const { 
        create: createPost,
        update: updatePost
      } = require('../../../stores/post');
const { create: createPostTag } = require('../../../stores/post-tag');
const dynamicLink = require('../../../services/dynamic-link');

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

    // create dynamic link
    const shareLink = await dynamicLink(`/post/${post._id}`);
    updatePost({_id:post._id}, {shareLink: shareLink});
    post.shareLink=shareLink;

    if(ctx.request.body.tags && ctx.request.body.tags.length>0) {
      post.tags=[];
      const result = await Promise.all(map(ctx.request.body.tags, (doc) => new Promise(async (resolve) => {
          let postTagDoc = {
            postId: post._id,
            type: doc.type
          };

          if(doc.type=='user') postTagDoc.taggedUserId = doc.id;
          if(doc.type=='service') postTagDoc.taggedServiceId = doc.id;

          const postTag = await createPostTag(postTagDoc);
          if (!postTag || postTag.error) ctx.throw(500, errorMessagePostTag);

          post.tags.push(postTag);
          return resolve(postTagDoc);
      })));
    }

    console.log(post);

    ctx.body = {
        post: post
    };
};
