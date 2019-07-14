const assert = require('assert');

const { create: createComment, findOne: findOneComment } = require('../../../stores/post-comment');
const { create: createPost } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/:idPost/comment/:idComment PUT sohuld create a post given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await createPost(body);
            console.log('postCreated ', postCreated);
            const comment = {
                postId: postCreated._id,
                comment: 'comment',
                userId: __user._id
            };
            const commentCreated = await createComment(comment);
            console.log('commentCreated ', commentCreated);
            const update = {
                comment: 'comment 2'
            };
            const { body: res } = await agent.put(`/post/${commentCreated._id}/comment`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            const updated = await findOneComment({ _id: commentCreated._id });
            console.log('update ', updated);
            assert.equal(updated.comment, update.comment);
        });
    });

    describe('FAIL', () => {
        it('/post/:idPost/comment/:idComment PUT sohuld create a post given', async() => {
            const update = {
                comment: 'comment 2'
            };
            await agent.put('/post/1234567890qwertyuiopasdf/comment/')
                .send(update
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
