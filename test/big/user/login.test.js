const assert = require('assert');

const faker = require('faker');

const { create: createUser } = require('../../../stores/user');

describe('login services', () => {
    describe('SUCCESS', () => {
        it('/user/login POST -> user not found', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const { body: res } = await agent.post('/user/login')
                .send(body)
                .expect(404);

            assert(res.message === 'Authentication failed. User not found.');
        });

        it('/user/login POST -> user found and return the token', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            await createUser(body);
            const { body: res, headers } = await agent.post('/user/login')
                .send(body)
                .expect(200);
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(headers['set-cookie']);
            assert(res.success === true);
            console.log('res =====', res);
            assert(typeof res.token === 'string');
        });
    });

    describe('FAIL', () => {
        it('/user/login POST -> return error if pass is wrong', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            await createUser(body);
            body.password = faker.internet.password();
            const { body: res } = await agent.post('/user/login')
                .send(body)
                .expect(401);
            assert(res.message === 'Authentication failed. Wrong password.');
        });
    });
});
