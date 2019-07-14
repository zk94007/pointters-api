const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { findOne: findOneReview } = require('../../../stores/service-review');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/review POST sohuld create a service given', async() => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
                sellerId: require('mongoose').Types.ObjectId(),
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
                orderId:require('mongoose').Types.ObjectId(),
                comment: 'Great Service and on-time',
                qualityOfService: 4,
                overallRating: 80,
                willingToBuyServiceAgain: 0
            };
            const { body: res } = await agent
                .post(`/service/${serviceCreated._id}/review`)
                .send(review)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert(res.success);
            assert(res.review);
            const reviewCreated = await findOneReview({
                serviceId: serviceCreated._id
            });
            assert(reviewCreated);
        });
    });

    describe('FAIL', () => {
        it('/service/review POST sohuld create a service given', async() => {
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
            const review = {
                orderId:require('mongoose').Types.ObjectId(),
                comment: 'comments to test review',
                qualityOfService: 4,
                overallRating: 80,
                willingToBuyServiceAgain: 0
            };
            await agent
                .post(`/service/${serviceCreated._id}/review`)
                .send(review)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            await agent
                .post(`/service/${serviceCreated._id}/review`)
                .send(review)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(409);
        });
    });
});
