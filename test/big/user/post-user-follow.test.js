const assert = require('assert');

const { create: createUser, findOne } = require('../../../stores/user');
const { get: getFollowing } = require('../../../stores/following');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/followedId/follow GET -> should return user setting', async () => {
            const bodyFollowed = {
                email: 'test_post_followed@test.com',
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
                email: 'test_post_following@test.com',
                password: 'test',
                firstName: 'Black',
                settings: {
                    generalNotifications: 'pushNotification',
                    orderNotifications: 'email',
                    offerNotifications: 'email',
                    summaryEmail: 'weekly'
                }
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
            const { body: res } = await agent.post(`/user/${userFollowed._id}/follow`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log(res);
            assert.deepEqual(res, { followed: true,  message: "successfully followed" });
            //const following = await getFollowing({ _id: userFollowing._id });
            //assert(following[0] === userFollowed._id);
        });
    });

    describe('FAIL', () => {
        it('/user/followedId/follow POST -> should return false if user to follow does not exist', async () => {
            const bodyFollowing = {
                email: 'test_post_false@test.com',
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
            const { body: res } = await agent.post('/user/this_id_does_not_exists/follow')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            //console.log(res);
            assert(res.message === 'Invalid followedId');
        });
    });
});
