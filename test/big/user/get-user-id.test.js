const assert = require('assert');

const { create: createUser } = require('../../../stores/user');


describe('User/:id services', () => {
    describe('SUCCESS', () => {
        it('/user/ GET -> should return the other user', async() => {
            const body = {
                email: 'test_get@test.com',
                password: 'test'
            };
            await createUser(body);
            const bodyOther = {
                email: 'test_get_other@test.com',
                password: 'test'
            };
            const userOther = await createUser(bodyOther);
            console.log('userOther ', userOther);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const toSend = {
                userId: userOther._id
            };
            const { body: res } = await agent.get('/user')
                .query(toSend)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.equal(res.user.email, userOther.email);
            assert(!res.user.password);
        });
    });
});
