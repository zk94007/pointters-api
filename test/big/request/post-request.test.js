const assert = require('assert');

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request POST sohuld create a request given', async() => {
            const body = {
                category: {
                    type: 'Object'
                },
                location: {
                    type: 'Object'
                },
                minPrice: 1,
                maxPrice: 1,
                scheduleDate: 1,
                description: 'Need dog walk service on Christmas holiday'
            };
            const { body: res } = await agent.post('/request')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(body.category, res.category);
            assert.deepEqual(body.location, res.location);
        });
    });

    describe('FAIL', () => {

    });
});
