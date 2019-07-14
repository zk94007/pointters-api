const assert = require('assert');

const { create: createdOrder, findOne: findOnedOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:iddOrder DELETE sohuld create a request given', async () => {
            const orderCreated = await createdOrder(order);
            console.log('order ====: ', orderCreated);
            await agent.delete(`/order/${orderCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const orderNotActive = findOnedOrder({ _id: orderCreated._id });
            assert(!orderNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/order/:iddOrder DELETE sohuld return error', async () => {
            await agent.delete('/order/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
