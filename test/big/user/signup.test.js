const assert = require('assert');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/signup POST -> user found and return the token', async () => {
            const body = {
                email: 'test_signup@test.com',
                password: 'test'
            };
            const { body: res, headers } = await agent.post('/user/signup')
                .send(body)
                .expect(200);
            'res = ', res;
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(headers['set-cookie']);
            assert(res.success === true);
            assert(typeof res.token === 'string');
        });
    });
    describe('FAIL', () => {
        it('/user/signup POST -> should a error if email is not send', async () => {
            const body = {
                password: 'test'
            };
            const { body: res } = await agent.post('/user/signup')
                .send(body)
                .expect(400);
            assert(res.message === 'email is required');
        });

        it('/user/signup POST -> should a error if email is not send', async () => {
            const body = {
                email: 'the_pass_is_not_send@test.com'
            };
            const { body: res } = await agent.post('/user/signup')
                .send(body)
                .expect(400);
            assert(res.message === 'password is required');
        });
    });
});
