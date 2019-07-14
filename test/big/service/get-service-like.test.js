const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const {findOne: findOneUser, update: updateUser} = require('../../../stores/user');

describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like GET sohuld create a service given', async () => {
            const service = {
                userId: __user._id,
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
            await updateUser({_id: __user._id}, {likes: [ serviceCreated._id ]});
            const user = await findOneUser({_id:__user._id});
            console.log('user =', user);
            const { body: res } = await agent.get(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res, { likes: true });
        });
    });

    describe('FAIL', () => {
        it('/service/like GET sohuld create a service given', async () => {
            await agent.get(`/service/1234567890qwertyuiopasdf/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
