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
            const media = {
                fileName:'filiname',
                mediaType:'image'
            };

            const {body: {media: response}} = await agent.post(`/post/${postCreated._id}/media`)
                .send(media)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(response);
            const updated = await findOne({ _id: postCreated._id });
            assert.equal(updated.media[0].fileName, media.fileName);
            assert.equal(updated.media[0].mediaType, media.mediaType);
        });
    });

    describe('FAIL', () => {

    });
});
