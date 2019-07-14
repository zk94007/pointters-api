const assert = require('assert');
const mongo = require('mongoose');
const { create:createService, delete: deleteRequests } = require('../../../stores/service');
const { create: createReview } = require('../../../stores/service-review');
const {pagination:{serviceReviews:limit}} = require('../../../config');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/review GET sohuld create a service given', async() => {
            const service = {
                userId: mongo.Types.ObjectId(),
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
            const review = {
                serviceId: serviceCreated._id,
                userId: __user._id,
                orderId:mongo.Types.ObjectId(),
                comment: 'comments to test review',
                qualityOfService: 4,
                overallRating: 80,
                willingToBuyServiceAgain: false
            };
            const reviewCreated = await createReview(review);
            console.log('reviewCreated ', reviewCreated);
            const { body: { review: res } } = await agent.get(`/service/review/${reviewCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res.comment, review.comment);
            assert.deepEqual(res.qualityOfService, review.qualityOfService);
            assert.deepEqual(res.overallRating, review.overallRating);
        });

        it('/services GGET all service saved with pagination', async() => {
            const service = {
                userId: mongo.Types.ObjectId(),
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
            for (let i = 0; i <= limit; i++) await createReview({
                serviceId: serviceCreated._id,
                userId: __user._id,
                orderId:require('mongoose').Types.ObjectId(),
                comment: 'comments to test review',
                qualityOfService: 4,
                overallRating: 80,
                willingToBuyServiceAgain: false
            });

            const { body: { reviews: res, next } } = await agent
                .get(`/service/${serviceCreated._id}/reviews`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert(res.length === limit);
            assert(next);

            const { body: { reviews: resSecond, next:nextSecond } } = await agent.get(next)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(resSecond.length === 1);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {
        it('/service/review GET sohuld create a service given', async() => {
            await agent.get('/service/review/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteRequests({}));
});
