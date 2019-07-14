const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne: findOneShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const shipment = {
                userId: __user._id
            };
            const shipmentCreated = await createShipment(shipment);
            console.log('shipmentCreated ', shipmentCreated);
            const update = {
                name: 'name put 2',
            };
            await agent.put(`/shipment/${shipmentCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({ _id: shipmentCreated._id });
            assert(updated);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const update = {
                name: 'name put 2',
            };
            await agent.put('/shipment/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
