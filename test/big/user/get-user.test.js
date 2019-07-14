const assert = require('assert');

const { create: createUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user GET -> should return user', async() => {
            const body = {
                email: 'test_get_me@test.com',
                password: 'test'
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.get('/user')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.equal(res.user.email, user.email);
            assert(!res.user.password);
        });
    });
});
