const assert = require('assert');


describe('FCM-token posts', () => {
    describe('SUCCESS', () => {
        it('/fcm-token DELETE sohuld create a post given', async() => {

            const tokenBody = {
                    token: '1234567890'
                };
            
           
            const { body: res } = await agent.delete('/fcmtoken')
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
