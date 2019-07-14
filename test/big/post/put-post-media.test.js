const assert = require('assert');

const { findOne, create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/media PUT sohuld create a post given', async() => {
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
            console.log('postCreated ', postCreated, postCreated.media[0]);
            const update = {
                mediaType: 'video'
            };

            await agent.put(`/post/${postCreated._id}/media/${postCreated.media[0]._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOne({ _id: postCreated._id });
            assert.equal(updated.media[0].mediaType, update.mediaType);
        });
    });

    describe('FAIL', () => {
        it('/post/media PUT sohuld create a post given', async() => {
            const update = {
                mediaType: 'video'
            };

            await agent
                .put('/post/1234567890qwertyuiopasdf/media/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
