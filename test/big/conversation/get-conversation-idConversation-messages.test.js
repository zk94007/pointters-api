const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createMessage } = require('../../../stores/message');
const { create: createUser } = require('../../../stores/user');
const { create: createConversation } = require('../../../stores/conversation');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/conversation/:idConversation/messages GET -> should return 200', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            
            const conversations = await createConversation({ users: [require('mongoose').Types.ObjectId()] });
            const data = {
                conversationId: conversations._id,
                userId: require('mongoose').Types.ObjectId(),
                serviceId: require('mongoose').Types.ObjectId(),
                offerId: require('mongoose').Types.ObjectId(),
                requestId: require('mongoose').Types.ObjectId(),
            }
            const message = await createMessage(data);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get('/conversation/' + conversations._id + '/messages')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);  
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
    });
    describe('FAIL', () => {
        it('/conversation/:idConversation/messages GET -> should return 404', async() => {
            
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
            const { body: { message } } = await agent.get('/conversation/:idConversation/messages')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'No message found');
        });
        it('/conversation/:idConversation/messages GET -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.get(`/conversation/:idConversation/messages`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});