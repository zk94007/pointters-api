const assert = require('assert');

const { create: createShipment, delete: deleteShipment, findOne: findOneShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment DELETE sohuld create a request given', async () => {
            const shipment = {
                userId: __user._id
            };
            const shipmentCreated = await createShipment(shipment);
            console.log('shipment ====: ', shipmentCreated);
            await agent.delete(`/shipment/${shipmentCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const shipmentNotActive = findOneShipment({ _id: shipmentCreated._id });
            assert(!shipmentNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment DELETE sohuld create a request given', async () => {
            await agent.delete('/shipment/1234567890qwertyuiopasdf')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
