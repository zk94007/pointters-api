const assert = require('assert');

const { create: createOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order GET sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);
            console.log('orderCreated = ', orderCreated);
            const { body: res } = await agent
                .get(`/order/${orderCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res =====', res);
            assert(typeof res.order === 'object');
        });
    });

    
});
