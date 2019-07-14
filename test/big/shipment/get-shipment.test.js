const assert = require('assert');

const { create: createShipment, delete: deleteShipment } = require('../../../stores/shipment');
const {pagination:{shipments:limit}} = require('../../../config');

describe('User shipments', () => {
    describe('SUCCESS', () => {
        it('/shipment GET sohuld create a request given', async() => {
            const shipmentCreated = await createShipment({
                userId: __user._id
            });
            console.log('shipmentCreated ', shipmentCreated);
            const { body: res } = await agent
                .get(`/shipment/${shipmentCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof res.shipment === 'object');
        });

        it('/shipments GET all request saved with pagination', async() => {
            for (let i = 0; i <= limit; i++) await createShipment({
                userId: __user._id
            });

            const { body: {shipments:res} } = await agent.get('/shipments')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res.length ', res);
            assert(res.length);
        });
    });

    describe('FAIL', () => {
        it('/shipment GET sohuld create a request given', async() => {
            await agent
                .get('/shipment/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
