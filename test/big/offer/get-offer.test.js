const assert = require('assert');

const { create: createOffer } = require('../../../stores/offer');
const {pagination:{offers:limit}} = require('../../../config');

describe('User offers', () => {
    describe('SUCCESS', () => {
        it('/request/offer GET sohuld create a request given', async() => {
            const offerCreated = await createOffer({
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
                scheduleDate: new Date().toString(),
                serviceId: require('mongoose').Types.ObjectId(),
                userId: __user._id

            });
            const { body: res } = await agent
                .get(`/offer/${offerCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof res.offer === 'object');
        });

        it('/offers GET all request saved with pagination', async() => {
            const body = {
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
                scheduleDate: new Date().toString(),
                serviceId: require('mongoose').Types.ObjectId(),
                userId: __user._id
            };
            for (let i = 0; i <= limit; i++) await createOffer(body);

            const { body: { offers: res, next } } = await agent.get('/offers')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.length === limit);
            assert(next);

            const { body: { offers: resSecond, next:nextSecond } } = await agent.get(next)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(resSecond.length === 1);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {
        it('/request/offer GET sohuld create a request given', async() => {
            await agent
                .get('/offer/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
