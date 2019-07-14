const assert = require('assert');

const { findOne } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service POST sohuld create a service given', async() => {
            const body = {
                userId: require('mongoose').Types.ObjectId(),
                category: {
                    category: 'category'
                },
                description: 'description',
                shareLink: 'http://pointters.com/'
            };

            const { body: res } = await agent.post('/service')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
                
            
            assert(res.success === true);
            assert(typeof res.service === 'object');
            const serviceCreated = await findOne({});
            assert.deepEqual(serviceCreated.category, body.category);
            assert.deepEqual(serviceCreated.description, body.description);
        });
    });

    describe('FAIL', () => {

    });
});
