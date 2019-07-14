const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createFollowing } = require('../../../stores/following');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/following GET -> should return 200', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const bodyOther = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const userOther = await createUser(bodyOther);
            const following = await createFollowing({ followFrom: user._id, followTo: userOther._id });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get('/user/following')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);  
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
    });
    describe('FAIL', () => {
        it('/user/following GET -> should return 404', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const bodyOther = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const userOther = await createUser(bodyOther);
            const following = await createFollowing({ followFrom: userOther._id, followTo: user._id });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.get('/user/following')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
                console.log("message = ", message);
            assert(message === 'No follower found');
        });
        it('/user/following GET -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.get(`/user/following`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});