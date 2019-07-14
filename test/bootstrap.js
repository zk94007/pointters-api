const supertest = require('supertest');

const { create: createUser, delete: removeUser } = require('../stores/user');
const { delete: removeService } = require('../stores/service');
const app = require('../server');


before(async() => {
    global.agent = supertest(app);
    const body = {
        firstName:'Black',
        lastName:'Horse',
        email: 'black.horse775588@gmail.com',
        password: 'test',
        isAdmin: true
    };
    const user = await createUser(body);
    global.__user = user;
    const { body: res, headers: { 'set-cookie': cookie } } = await agent
        .post('/user/login')
        .send(body)
        .expect(200);
    console.log('res in bootstrap ', res);
    global.authorizationHeader = { Authorization: `Bearer ${res.token}` };
    global.Cookie = { Cookie: cookie };
    global.userName = body.firstName; // black
});

after(async() => {
    await removeUser({});
    await removeService({});
});

