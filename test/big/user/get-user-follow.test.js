const assert = require('assert');

const { create: createUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/followedId/follow GET -> should return user setting', async() => {
            const body_followed = {
                email: 'test_get_followed@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
            };
            const user_followed = await createUser(body_followed);
            const body_following = {
                email: 'test_get_following@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
                following: [ user_followed._id ]
            };
            await createUser(body_following);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: body_following.email,
                password: body_following.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.get(`/user/${user_followed._id}/follow`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { following: true });
        });
    });

    describe('FAIL', () => {
        it('/user/followedId/follow GET -> should return false if user to follow does not exist', async() => {
            const body_following = {
                email: 'test_get_false@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
                following: [ 'this_id_does_exist' ]
            };
            await createUser(body_following);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: body_following.email,
                password: body_following.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            authorizationHeader, Cookie;
            const { body: res } = await agent.get('/user/this_id_does_not_exists/follow')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { following: false });
        });
    });
});
