const assert = require('assert');

const { create: createService } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment POST sohuld create a post given', async() => {
            const post = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                pricing: {
                    pricing: 'pricing'
                },
                fulfillmentMethod: {
                    fulfillmentMethod: 'fulfillmentMethod'
                },

            };
            const postCreated = await createService(post);
            const { body: res } = await agent
                .post(`/post/${postCreated._id}/comment`)
                .send({
                    comment: 'Where did you go to get that service?'
                })
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            //console.log(res);
            assert.equal(res.success, true);
            assert(res.comment);
        });
    });

    describe('FAIL', () => {

    });
});
