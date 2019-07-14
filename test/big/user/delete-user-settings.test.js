const assert = require('assert');

const { create: createUser, findOne } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/setting DELETE -> should return user setting', async() => {
            const body = {
                email: 'test_delete_settings@test.com',
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
            const res = await agent.delete('/user/setting')
                .set(authorizationHeader)
                .set(Cookie)
                .send({
                    fields: [ 'offerNotifications' ]
                })
                .expect(200);
            console.log('deleted : ', res.body);
            const userUpdated = await findOne({ email: body.email });
            console.log('userUpdated ', userUpdated.settings.offerNotifications);
            assert(userUpdated.settings.offerNotifications === 'all');
        });
    });

    describe('FAIL', () => {
        it('/user/setting DELETE -> should return user setting', async() => {
            const body = {
                email: `test_delete_setting${Date.now()}@test.com`,
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
            await agent.delete('/user/setting')
                .set(authorizationHeader)
                .set(Cookie)
                .send({})
                .expect(400);
        });
    });
});
