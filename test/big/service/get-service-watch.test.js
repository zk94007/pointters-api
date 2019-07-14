const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch GET sohuld create a service given', async () => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description',
                media: {
                    media: 'media'
                },
                pricing: {
                    pricing: 'pricing'
                },
                fulfillmentMethod: {
                    fulfillmentMethod: 'fulfillmentMethod'
                },
            };
            const serviceCreated = await createService(service);
            await updateUser({
                email: __user.email
            },
                {
                    watching: [ serviceCreated._id ]
                });
            const { body: res } = await agent
                .get(`/service/${serviceCreated._id}/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res, { watching: true });
        });
    });

    describe('FAIL', () => {
        it('/service/watch GET sohuld create a service given', async () => {
             await agent
                .get(`/service/1234567890qwertyuiopasdf/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
