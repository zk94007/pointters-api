const assert = require('assert');

const { create: createUser, findOne } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/setting POST -> should return user setting', async() => {
            const body = {
                email: 'test_post_settings@test.com',
                password: 'test'
            };
            await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const settings = {
                summaryEmail: 'daily'
            };
            await agent.put('/user/setting')
                .set(authorizationHeader)
                .set(Cookie)
                .send(settings)
                .expect(200);
            const userUpdated = await findOne({ email: body.email });
            assert(settings.summaryEmail, userUpdated.settings.summaryEmail);
        });
    });
});
