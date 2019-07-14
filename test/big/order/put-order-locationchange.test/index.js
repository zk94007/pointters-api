const assert = require('assert');

const { create: createOrder, findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:idOrder/request-location-change PUT sohuld create a request given', async() => {
            const orderCreated = await createOrder(order);
            console.log('orderCreated ', orderCreated);
            const update = {
                sellerAcceptedBuyerServiceLocation: false,
                buyerServiceLocation:{
                    city: 'String',
                    country: 'String',
                    geoJson: {
                        type: 'Point',
                        coordinates: [ 12.123456, 13.134578 ]
                    },
                    postalCode: 'String',
                    province: 'String',
                    state: 'String'
                }
            };
            await agent.put(`/order/${orderCreated._id}/request-location-change`)
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
        it('/order/:idOrder/request-location-change PUT sohuld create a request given', async() => {
            const update = {
                sellerAcceptedBuyerServiceLocation: false,
                buyerServiceLocation:{
                    city: 'String',
                    country: 'String',
                    geoJson: {
                        type: 'Point',
                        coordinates: [ 12.123456, 13.134578 ]
                    },
                    postalCode: 'String',
                    province: 'String',
                    state: 'String'
                }
            };
            await agent.put(`/order/1234567890qwertyuiopasdf/request-location-change`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
