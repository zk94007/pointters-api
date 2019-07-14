const assert = require('assert');

const { create: createOffer, findOne: findOneOffer } = require('../../../stores/offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/offer/:idOffer PUT sohuld create a request given', async() => {
            const offer = {
                serviceId: require('mongoose').Types.ObjectId(),
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
            await agent.put(`/offer/${offerCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOffer({ _id: offerCreated._id });
            console.log('update ', updated);
            assert.deepEqual(updated.price, update.price);
        });
    });

    describe('FAIL', () => {
        it('/offer/:idOffer PUT sohuld create a request given', async() => {
            const update = {
                price: {
                    amount: 0
                }
            };
            await agent.put('/offer/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
