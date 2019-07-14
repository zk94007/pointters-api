const assert = require('assert');

const faker = require('faker');

describe('logout services', () => {
    describe('SUCCESS', () => {
        it('/user/logout POST -> user not found', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const { body: res } = await agent.post('/user/logout')
                .send(body)
                .expect(401);
            assert(res.message === 'Authentication Error');
        });

        it('/user/logout POST -> should logout the user', async() => {
            console.log('authorizationHeader = ', authorizationHeader);
            console.log('Cookie = ', Cookie);
            const { headers: { 'set-cookie': cookie } } = await agent.post('/user/logout')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
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
                .set(Cookie);
        });
    });

    after(async () => {
        const body = {
            email: 'test@test.com',
            password: 'test'
        };
        const { body: res, headers: { 'set-cookie': cookie } } = await agent
            .post('/user/login')
            .send(body)
            .expect(200);
        global.authorizationHeader = { Authorization: `Bearer ${res.token}` };
        global.Cookie = { Cookie: cookie };
    });
});
