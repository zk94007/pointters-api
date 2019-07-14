const assert = require('assert');

const { findOne, create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post DELETE sohuld create a post given', async() => {
            const body = {
                isActive: true,
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await create(body);
            await agent.delete(`/post/${postCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({ _id: postCreated._id });
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
