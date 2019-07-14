const assert = require('assert');

const { create: createUser, findOne } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/setting PUT -> should return user setting', async() => {
            const body = {
                email: 'test_put_settings@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
            };
            await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: body.email,
                password: body.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            await agent.put('/user/setting')
                .set(authorizationHeader)
                .set(Cookie)
                .send({
                    summaryEmail: 'daily'
                })
                .expect(200);
            const userUpdated = await findOne({ email: body.email });
            assert.deepEqual('daily', userUpdated.settings.summaryEmail);
        });
    });
});
