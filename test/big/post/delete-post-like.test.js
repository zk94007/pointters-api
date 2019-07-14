const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { findOne: findOneUser, update: updateUser } = require('../../../stores/user');
const { get: getPostLikes } = require('../../../stores/post-like');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/like DELETE sohuld create a post given', async () => {
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
            console.log('postCreated ', postCreated);
            await updateUser({ _id: __user._id }, { likesPost: [ postCreated._id ] });
            const user1 = await findOneUser({ _id: __user._id });
            console.log('user =  ', user1);

            const { body: res } = await agent.delete(`/post/${postCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const likesPost = await getPostLikes({ _id: __user._id });
            console.log('user =  ', likesPost);

            assert.deepEqual(likesPost, []);
        });
    });

    describe('FAIL', () => {
        it('/post/like DELETE sohuld create a post given', async () => {
            await agent.delete(`/post/1234567890qwertyuiopasdf/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
