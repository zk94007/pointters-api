const assert = require('assert');

const { findOne, create } = require('../../../stores/request');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request PUT sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                category:{
                    type: Object
                },
                location:{
                    type: Object
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:new Date().toString(),
            };
            const requestCreated = await create(body);

            console.log('requestCreated ', requestCreated);
            const update = {
                media: {
                    media: 'the media is here updated'
                }
            };

            await agent.put(`/request/${requestCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOne({ _id: requestCreated._id });
            assert.deepEqual(updated.category, update.category);
        });
    });

    describe('FAIL', () => {
        it('/request PUT sohuld return 404 if user does not exists', async() => {
            const update = {
                media: {
                    media: 'the media is here updated'
                }
            };

            await agent.put('/request/123456789012345678901234')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
