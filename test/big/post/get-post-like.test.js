const assert = require('assert');

const { create: createpost } = require('../../../stores/post');
const { update: updateUser } = require('../../../stores/user');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/like GET sohuld create a post given', async () => {
            const post = {
                userId: __user._id,
                message: 'String',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'String' ],
            };
            const postCreated = await createpost(post);
            await updateUser({
                email: __user.email
            },
                {
                    likesPost: [ postCreated._id ]
                });
            const { body: res } = await agent.get(`/post/${postCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { likesPost: true });
        });
    });

    describe('FAIL', () => {
        it('/post/like GET sohuld create a post given', async () => {
            await agent.get('/post/1234567890qwertyuiopasdf/like')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
