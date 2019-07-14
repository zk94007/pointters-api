const assert = require('assert');

const { create: createOffer, findOne: findOneOffer } = require('../../../stores/offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/offer/:idOffer DELETE sohuld create a request given', async () => {
            const offer = {
                userId: __user._id,
                serviceId: require('mongoose').Types.ObjectId(),
                isActive: true,
                category: {
                    type: 'Object'
                },
                location: {
                    type: 'Object'
                },
                media: {
                    type: 'Object'
                },
                minPrice: 0,
                maxPrice: 1,
                scheduleDate: new Date().toString()
            };
            const offerCreated = await createOffer(offer);
            console.log('offer ====: ', offerCreated);
            await agent.delete(`/offer/${offerCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const offerNotActive = findOneOffer({ _id: offerCreated._id });
            assert(!offerNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/offer/:idOffer DELETE sohuld create a request given', async () => {
            await agent.delete('/offer/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
