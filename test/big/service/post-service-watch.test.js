const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser } = require('../../../stores/user');
const { get: getWatching } = require('../../../stores/service-watch');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch POST sohuld create a service given', async() => {
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
            const { body: res } = await agent
                .post(`/service/${serviceCreated._id}/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log(res);
            
            assert(res.watched === true);
        });
    });

    describe('FAIL', () => {

    });
});
