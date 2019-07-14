const assert = require('assert');

const faker = require('faker');

const { findOne, create: createUser } = require('../../../stores/user');

describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user PUT -> should create the user', async() => {
            const body = {
                email: 'test_update@test.com',
                password: 'test'
            };
            await createUser(body);
            const { body: { token }, headers: { 'set-cookie': cookie } } = await agent.post('/user/login').send(body);
            global.authorizationHeader = { Authorization: `Bearer ${token}` };
            global.Cookie = { Cookie: cookie };
            const data = {
                awards: faker.commerce.productName(),
                companyName: faker.commerce.productName(),
                description: faker.commerce.productName(),
                education: faker.commerce.productName(),
                firstName: faker.commerce.productName(),
                insurance: faker.commerce.department(),
                lastName: faker.commerce.productName(),
                license: faker.commerce.productName(),
                phone: '23423423423'
            };
            await agent
                .put('/user')
                .send(data)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const query = Object.assign({ email: body.email }, data);


            const _user = await findOne({ email: body.email });
            assert(_user);
        });
    });
});
