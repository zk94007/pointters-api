const assert = require('assert');

const { create: createUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/setting GET -> should return user setting', async() => {
            const body = {
                email: 'test_get_settings@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: body.email,
                password: body.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.get('/user/setting')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, user.settings);
        });
    });
});
