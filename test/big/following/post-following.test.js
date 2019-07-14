const assert = require('assert');
const faker = require('faker');
const supertest = require('supertest');
const app = require('../../../server');
const { create: createUser } = require('../../../stores/user');
const { create: createFollowing } = require('../../../stores/following');
const agent = supertest(app);
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/following/:idUser post -> should return 200', async() => {
            
            const bodyFrom = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const userFrom = await createUser(bodyFrom);
            const bodyTo = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const userTo = await createUser(bodyTo);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(bodyFrom);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { success } } = await agent.post('/following/' + userTo._id)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(success === true);
        });
    });
    describe('FAIL', () => {
        it('/following/:idUser post -> should return 404 not User find', async() => {
            
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
            const { body: { message } } = await agent.post('/following/:idUser')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
                console.log(message);
            assert(message === 'Error in find User');
        });
        it('/following/:idUser post -> should return 404 already exist', async() => {
            
            const bodyFrom = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const userFrom = await createUser(bodyFrom);
            const bodyTo = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const userTo = await createUser(bodyTo);
            const follow = await createFollowing({ followFrom: userFrom._id, followTo: userTo._id });
            console.log("follow =====", follow);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent
                .post('/user/login')
                .send(bodyFrom);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: { message } } = await agent.post('/following/' + userTo._id)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert(message === 'following already exist');
        });
        it('/following/:idUser post -> should return 401', async() => {
            
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
            const { body: { message } } = await agent.post(`/following/:idUser`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(401);
            assert(message === 'Authentication Error');
        });
    });
});