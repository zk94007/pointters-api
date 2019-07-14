const assert = require('assert');

const { create: createService, findOne: findOneService } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/share POST sohuld create a service given', async() => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description'
            };
            const serviceCreated = await createService(service);
            console.log('serviceCreated ', serviceCreated);
            const { body: res } = await agent.post(`/service/${serviceCreated._id}/share`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            const serviceShared = await findOneService({ userId: __user._id });
            assert.deepStrictEqual(res.service.category, serviceShared.category);
            assert(serviceShared.isActive === undefined);
        });
    });

    describe('FAIL', () => {

    });
});
