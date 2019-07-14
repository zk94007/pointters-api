const assert = require('assert');

const { findOne, create } = require('../../../stores/request');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request DELETE sohuld create a request given', async() => {
            const body = {
                isActive: true,
                userId: __user._id,
                category:{
                    type: Object
                },
                location:{
                    type: Object
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:new Date().toString()
            };
            const requestCreated = await create(body);

            console.log('requestCreated ', requestCreated);
            await agent.delete(`/request/${requestCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({ _id: requestCreated._id });
            console.log('deleted ', deleted);
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {
        it('/request DELETE sohuld create a request given', async() => {
            
            await agent.delete(`/request/1234567890qwertyuiopasdf`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
