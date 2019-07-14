const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createlike } = require('../../../stores/service-like');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/services/liked GET -> should return 200', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const like = await createlike({ userId: user._id, serviceId: require('mongoose').Types.ObjectId() });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get('/services/liked')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);  
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
    });
    describe('FAIL', () => {
        it('/services/liked GET -> should return 404', async() => {
            
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
            const { body: { message } } = await agent.get('/services/liked')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
                console.log("message = ", message);
            assert(message === 'like does not exists');
        });
        it('/services/liked GET -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.get(`/services/liked`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});