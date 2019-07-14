const assert = require('assert');
const faker = require('faker');
const { create: createUser } = require('../../../stores/user');

describe('FCM-token posts', () => {
    describe('SUCCESS', () => {
        it('/fcm-token POST sohuld create a post given', async() => {

            const tokenBody = {
                    deviceType: 'web',
                    token: '1234567890'
                };
            
           
            const { body: res } = await agent.post('/fcmtoken')
                .send(tokenBody)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(body.message, res.post.message);
            assert(body.media, res.post.media);
            assert.deepEqual(body.tags, res.post.tags);
        });
    });

    describe('FAIL', () => {

    });
});
