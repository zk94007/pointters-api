const assert = require('assert');

const { create: createOffer, findOne: findOneOffer } = require('../../../stores/request-offer');
const { create: createRequest } = require('../../../stores/request');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/:idRequest/offer PUT sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                category: {
                    type: 'Object'
                },
                location: {
                    type: 'Object'
                },
                minPrice: 1,
                maxPrice: 1,
                scheduleDate: 1
            };
            const requestCreated = await createRequest(body);
            console.log('requestCreated ', requestCreated);
            const offer = {
                requestId: requestCreated._id,
                fulfillmentMethod: {},
                location: {},
                media: {},
                price: {},
                workDuration: {},
                workDurationUom: 'hour',
                userId: __user._id
            };
            const offerCreated = await createOffer(offer);
            console.log('offerCreated ', offerCreated);
            const update = {
                price: {
                    amount: 0
                }
            };
            await agent.put(`/request/offer/${offerCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOffer({ _id: offerCreated._id });
            assert.deepEqual(updated.price, update.price);
        });
    });

    describe('FAIL', () => {
        it('/request/:idRequest/offer PUT sohuld create a request given', async() => {
            const update = {
                price: {
                    amount: 0
                }
            };
            await agent.put(`/request/offer/1234567890qwertyuiopasdf`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
