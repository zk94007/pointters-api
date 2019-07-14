const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createrequestOffer } = require('../../../stores/request-offer');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/jobs GET -> should return 200', async() => {
            
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const user = await createUser(body);
            const rData = {
                sellerId: user._id,
                requestId: require('mongoose').Types.ObjectId(),
                buyerId: require('mongoose').Types.ObjectId(),
                price: 1,
                workDuration: 1,
                workDurationUom: 'hour'
            };
            const rOffers = await createrequestOffer(rData);
            console.log(rOffers);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { docs } } = await agent.get('/jobs')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof docs === 'array' || typeof docs === 'object');
        });
    });
    describe('FAIL', () => {
        it('/jobs GET -> should return 404', async() => {
            
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
            const { body: { message } } = await agent.get('/jobs')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'Error in find request-offer');
        });
        it('/jobs GET -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.get(`/jobs`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});