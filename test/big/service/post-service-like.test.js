const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser } = require('../../../stores/user');
const { get: getLikes } = require('../../../stores/service-like');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like POST sohuld create a service given', async () => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: '$10 for 1 hour of dog walk service',
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
            console.log('serviceCreated ', serviceCreated);
            await updateUser({ _id: __user._id }, { likes: [] });
            const { body: res } = await agent.post(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.liked===true);
            //const likes = await getLikes({ _id: __user._id });
            //assert.deepEqual(likes, [ serviceCreated._id ]);
        });
    });

    describe('FAIL', () => {

    });
});
