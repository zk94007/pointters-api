const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createFollowing } = require('../../../stores/following');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/following/:idfollowing GET -> should return 200', async() => {
            
            const bodyFrom = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const userFrom = await createUser(bodyFrom);
            const follow = await createFollowing({ followFrom: userFrom._id, followTo: require('mongoose').Types.ObjectId() });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(bodyFrom);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { following } } = await agent.get('/following/' + follow._id)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log("typeof following", typeof following);
            assert(typeof following === 'object');
        });
    });
    describe('FAIL', () => {
        it('/following/:idfollowing GET -> should return 404', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.get('/following/:idfollowing')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'Error in find following');
        });
        it('/following/:idfollowing GET -> should return 401', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
            .post('/user/login')
            .send({
                email: body.email,
                password: body.password
            });
            console.log("token =======", token)
            const authorizationHeader = { Authorization: `Bearer test` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.get(`/following/:idfollowing`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});