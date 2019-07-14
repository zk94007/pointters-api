const assert = require('assert');

const { create, findOne } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service DELETE sohuld create a service given', async () => {
            const body = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description'
            };
            const serviceCreated = await create(body);
            await agent.delete(`/service/${serviceCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({_id:serviceCreated._id});
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {
        it('/service DELETE sohuld create a service given', async () => {
            await agent.delete('/service/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
