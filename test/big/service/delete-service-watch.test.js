const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { create } = require('../../../stores/service-watch');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch DELETE sohuld create a service given', async () => {
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
            const watch = await create({ userId: __user._id, serviceId: serviceCreated._id });
            const { body: { success } } = await agent
                .delete(`/service/${serviceCreated._id}/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(success === true);
        });
    });

    describe('FAIL', () => {
        it('/service/watch DELETE sohuld create a service given', async () => {
            await agent
                .delete('/service/1234567890qwertyuiopasdf/watch')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
