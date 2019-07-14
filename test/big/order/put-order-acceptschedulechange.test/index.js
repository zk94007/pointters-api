const assert = require('assert');

const { create: createOrder, findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:idOrder/accept-schedule-change PUT sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);
            await agent.put(`/order/${orderCreated._id}/accept-schedule-change`)
                .send(orderCreated)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOrder({ _id: orderCreated._id });
            assert.deepEqual(updated.sellerAcceptedBuyerServiceLocation, true);
        });
    });

    describe('FAIL', () => {
        it('/order/:idOrder/accept-schedule-change PUT sohuld create a request given', async() => {
            
            await agent.put(`/order/1234567890qwertyuiopasdf/accept-schedule-change`)
                .send(order)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
