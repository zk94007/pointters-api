const assert = require('assert');

const { findOne: findOneOffer } = require('../../../stores/offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/offer POST sohuld create a request given', async() => {
            const body = {
                buyerId: require('mongoose').Types.ObjectId(),
                sellerId: require('mongoose').Types.ObjectId(),
                fulfillmentMethod: { fulfillmentMethod: 'fulfillmentMethod' },
                location: { location: 'location' },
                media: [{ media: 'media' }],
                price:  new Number(),
                serviceId: require('mongoose').Types.ObjectId(),
                workDuration: new Number(),
                workDurationUom: 'hour',
                currencyCode: 'String',
                description: '$20 for 1 hour of service description',
                shareLink: 'http://pointters.com/'


            };

            const { body: res } = await agent
                .post('/offer')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success);
            assert(res.offer._id);
            const offer = await findOneOffer(body);
            console.log(offer);
            //assert(offer.isActive === undefined);
        });
    });

    describe('FAIL', () => {

    });
});
