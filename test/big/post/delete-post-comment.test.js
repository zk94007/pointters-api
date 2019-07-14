const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { create: createComment, findOne: findOneComment } = require('../../../stores/post-comment');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment DELETE sohuld create a post given', async() => {
            console.log('__user = ', __user);
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };

            const postCreated = await createPost(post);
            const comment = {
                userId: __user._id,
                postId: postCreated._id,
                isActive: true,
                comment: 'String'
            };
            console.log('comment: ', comment);
            const commentCreated = await createComment(comment);
            await agent.delete(`/post/comment/${commentCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const commentNotActive = findOneComment({ _id: commentCreated._id });
            assert(!commentNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/post/comment DELETE sohuld create a post given', async() => {
            await agent.delete('/post/comment/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
