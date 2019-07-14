const assert = require('assert');
const { create: createUser } = require('../../../../stores/user');

const { findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order2');

const order = getOrder();
describe('User requests', () => {
    describe('SUCCESS', () => {

        it('/order POST sohuld create a request given', async() => {
            const body = {
                email: 'test_get_me@test.com',
                password: 'test'
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };

            const { body: res } = await agent
                .post('/order')
                .send(order)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
             //assert.deepEqual(res, { success: true });
             const orderCreated = await findOneOrder({ buyerId: order.buyerId });
             assert(orderCreated.isActive === undefined);
        });
    });

    describe('FAIL', () => {

    });
});
