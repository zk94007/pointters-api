const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createService } = require('../../../stores/service');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/services GET -> should return 200', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const service = await createService({ userId: user._id, category: body, description: "test get-services" });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
            .post('/user/login')
            .send({
                email: body.email,
                password: body.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get(`/services`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
        it('/services/?userId=:id GET -> should return 200', async() => {
            
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
            const service = await createService({ userId: userOther._id, category: body, description: "test get-services/?userId" });
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get(`/services/?userId=` + userOther._id)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
    });
    describe('FAIL', () => {
        it('/services GET -> should return 404', async() => {
            
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
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.get(`/services`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'No service found');
        });
        it('/services GET -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.get(`/services`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});