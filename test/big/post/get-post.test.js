const assert = require('assert');

const { create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post GET sohuld create a post given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await create(body);
            console.log('__user', __user);
            console.log('postCreated ', postCreated);
            const { body: { post: res } } = await agent.get(`/post/${postCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res.message, body.message);
            assert.equal(res.media.fileName, body.media.fileName);
            assert.equal(res.media.mediaType, body.media.mediaType);
            assert.deepEqual(res.tags, body.tags);
        });
    });

    describe('FAIL', () => {
        it('/post GET sohuld create a post given', async() => {
            await agent.get('/post/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
