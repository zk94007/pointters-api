const assert = require('assert');

const { create: createOrder, findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:idOrder PUT sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);
            console.log('orderCreated ', orderCreated);
            const update = {
                cancellationDate: new Date()
            };
            await agent.put(`/order/${orderCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOrder({ _id: orderCreated._id });
            console.log('update ', updated);
            assert.deepEqual(updated.price, update.price);
        });
    });

    describe('FAIL', () => {
        it('/order/:idOrder PUT sohuld create a request given', async() => {
            const update = {
                cancellationDate: new Date()
            };
            await agent.put(`/order/1234567890qwertyuiopasdf`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
