const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { create } = require('../../../stores/service-like');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like DELETE sohuld create a service given 200', async () => {
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
            console.log(serviceCreated);
            const like = await create({ userId: __user._id, serviceId: serviceCreated._id });
            const { body: { success } } = await agent.delete(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(success === true);
        });
    });

    describe('FAIL', () => {
        it('/service/like DELETE sohuld create a service given', async () => {
            await agent.delete('/service/1234567890qwertyuiopasdf/like')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
