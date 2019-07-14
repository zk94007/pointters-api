const assert = require('assert');

const { create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service GET sohuld create a service given', async () => {
            const body = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description'
            };
            const serviceCreated = await create(body);
            const { body: { service: res } } = await agent.get(`/service/${serviceCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res.category, body.category);
            assert.deepEqual(res.description, body.description);
        });
    });

    describe('FAIL', () => {
        it('/service GET sohuld create a service given', async () => {
            await agent.get('/service/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
