const assert = require('assert');

const { create: createUser } = require('../../../stores/user');
const { get: getFollowing } = require('../../../stores/following');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/followedId/follow GET -> should return user setting', async() => {
            const bodyFollowed = {
                email: 'test_delete_followed@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
            };
            const userFollowed = await createUser(bodyFollowed);
            const bodyFollowing = {
                email: 'test_delete_following@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
                following: [ userFollowed._id ]
            };
            const userFollowing = await createUser(bodyFollowing);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: bodyFollowing.email,
                password: bodyFollowing.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.delete(`/user/${userFollowed._id}/follow`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const following = await getFollowing({ _id: userFollowing._id });
            console.log('following ', following);
            assert(following.length === 0);
            assert.deepEqual(res, { success: true });
        });
    });

    describe('FAIL', () => {
        it('/user/followedId/follow DELETE -> should return false if user to follow does not exist', async() => {
            const bodyFollowing = {
                email: 'test_delete_false@test.com',
                password: 'test',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                },
                following: [ 'this_id_does_exist' ]
            };
            await createUser(bodyFollowing);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: bodyFollowing.email,
                password: bodyFollowing.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.delete('/user/this_id_does_not_exists/follow')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert.deepEqual(res, { message: 'Id is not Valid' });
        });
    });
});
