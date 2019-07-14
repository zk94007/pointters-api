const assert = require('assert');

const { create: createOrder, findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:idOrder/request-cancel-order PUT sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);      
            const {body:result} = await agent.put(`/order/${orderCreated._id}/request-cancel-order`)
                .send(orderCreated)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOrder({ _id: orderCreated._id });
            
            assert(result.success===true);
        });
    });

    describe('FAIL', () => {
        it('/order/:idOrder/request-cancel-order PUT sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);
            await agent.put(`/order/1234567890qwertyuiopasdf/request-cancel-order`)
                .send(orderCreated)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
