const assert = require('assert');

const { create: createRequest } = require('../../../stores/request');
const { create: createOffer } = require('../../../stores/request-offer');
const {pagination:{offers:limit}} = require('../../../config');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/offer GET sohuld create a request given', async () => {
            const request = {
                userId: __user._id,
                category:{
                    type: 'Object'
                },
                location:{
                    type: 'Object'
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:1

            };
            const requestCreated = await createRequest(request);
            const offerCreated = await createOffer({
                category:{
                    type: 'Object'
                },
                location:{
                    type: 'Object'
                },
                minPrice:0,
                maxPrice:1,
                scheduleDate:1,
                requestId: requestCreated._id,
                userId: __user._id

            });
            const { body: res } = await agent
                .get(`/request/offer/${offerCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof res.offer === 'object');
        });

        it('/requests GET all request saved with pagination', async() => {
            const request = {
                userId: __user._id,
                category:{
                    type: 'Object'
                },
                location:{
                    type: 'Object'
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:1

            };
            const requestCreated = await createRequest(request);
            for (let i = 0; i <= limit; i++) await createOffer({
                category:{
                    type: 'Object'
                },
                location:{
                    type: 'Object'
                },
                minPrice:0,
                maxPrice:1,
                scheduleDate:1,
                requestId: requestCreated._id,
                userId: __user._id

            });

            const { body: { requestOffers: res, next } } = await agent
                .get(`/request/${requestCreated._id}/offers`)
                .set(authorizationHeader)
                .set(Cookie);

            assert(res.length === limit);
            assert(next);

            const { body: { requestOffers: resSecond, next:nextSecond } } = await agent.get(next)
                .set(authorizationHeader)
                .set(Cookie);
            assert(resSecond.length === 1);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {
        it('/request/offer GET sohuld create a request given', async () => {
            await agent
                .get('/request/offer/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
