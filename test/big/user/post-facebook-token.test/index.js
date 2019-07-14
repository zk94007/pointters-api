const assert = require('assert');

const { findOne } = require('../../../../stores/user');
const nock = require('./nock');

const id = 'super_id';
const body = {
    email: 'test_facebook@test.com',
    token: 'super_token',
    firstName: 'fakeFirstName',
    lastName: 'fakeLastName',
};
describe('User services', () => {
    before(() => {
        nock(body.token, id, `${body.firstName} ${body.LastName}`);
    });
    describe('SUCCESS', () => {
        it('/user/facebook/token POST -> user found and return the token', async() => {
            const { body: res, headers } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(200);
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(res.success === true);
            assert(res.msg === 'Successful created a new user');
            assert(typeof res.token === 'string');
            const user = await findOne({
                'socialNetwork.name': 'facebook',
            });
            assert(!user.error);
        });

        it('/user/facebook/token POST -> should return a message if user exists', async() => {
            await agent.post('/user/facebook/token')
                .send(body)
                .expect(200);
            const { body: resAfterLoggued } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(200);
            console.log('resAftderLoggued ', resAfterLoggued);
            assert(resAfterLoggued.msg === 'Successful login');
            assert(resAfterLoggued);
        });
    });
    describe('FAIL', () => {
        it('/user/facebook/token POST -> should throw a error if token is not valid', async() => {
            const body = {
                token: 'invalid_token'
            };
            const { body: res } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(403);
            assert(res.msg === 'Token not Valid');
        });
    });
});
