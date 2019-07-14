const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createConversation } = require('../../../stores/conversation');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/conversation PUT -> should return 200', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);

            const data = {
                users: [user._id, require('mongoose').Types.ObjectId()]
            };
            const conversations = await createConversation(data);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { newConversation } } = await agent.put('/conversation/' + conversations._id)
                .send(data)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof newConversation === 'object');
        });
    });
    describe('FAIL', () => {
        it('/conversation PUT -> should return 404 no user', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const data = {
                users: [user._id, require('mongoose').Types.ObjectId()]
            };
            const conversations = await createConversation(data);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.put('/conversation/' + conversations._id)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'No find Users');
        });
        it('/conversation PUT -> should return 404', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const data = {
                users: [user._id, require('mongoose').Types.ObjectId()]
            };
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.put('/conversation/' + user._id)
                .send(data)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'No find Conversation');
        });
        it('/conversation PUT -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.put(`/conversation`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});