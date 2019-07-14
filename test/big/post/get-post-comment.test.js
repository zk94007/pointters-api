const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { create: createComment } = require('../../../stores/post-comment');
const {pagination:{postComments:limit}} = require('../../../config');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment GET sohuld create a post given', async () => {
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ],

            };
            const postCreated = await createPost(post);
            const commentCreated = await createComment({
                comment: 'comment',
                postId: postCreated._id,
                userId: __user._id

            });
            console.log('commentCreated = ', commentCreated);
            const { body: res } = await agent
                .get(`/post/comment/${commentCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(typeof res.comment === 'object');
        });

        it('/offers GET all request saved with pagination', async() => {
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ],

            };
            const postCreated = await createPost(post);
            console.log('limit =', limit);
            for (let i = 0; i <= limit; i++) console.log(await createComment({
                comment: `comment : ${i}`,
                postId: postCreated._id,
                userId: __user._id
            })
            );

            const { body: { comments: res, next } } = await agent.get(`/post/${postCreated._id}/comment`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.length === limit);
            assert(next);

            const { body: { comments: resSecond, next:nextSecond } } = await agent.get(next)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(resSecond.length === 1);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {
        it('/post/comment GET sohuld create a post given', async () => {
            await agent
                .get('/post/1234567890qwertyuiopasdf/comment')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
