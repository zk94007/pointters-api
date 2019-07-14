const assert = require('assert');

const { create: createService } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/share POST sohuld create a service given', async() => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description',
            };
            const serviceCreated = await createService(service);
            console.log('serviceCreated ', serviceCreated);
            const { body: res } = await agent.get(`/service/${serviceCreated._id}/share`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepStrictEqual(res.service.category, service.category);
            assert.deepStrictEqual(res.service.description, service.description);
            assert(res.service.isActive === undefined);
        });
    });

    describe('FAIL', () => {
        it('/service/share POST sohuld create a service given', async() => {
            await agent.get('/service/1234567890qwertyuiopasdf/share')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
