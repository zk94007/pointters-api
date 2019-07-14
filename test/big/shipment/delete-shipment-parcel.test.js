const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne} = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment/parcel DELETE sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                parcel:{
                    length: 20.2,
                    width: 10.9,
                    height: 5,
                    weight: 65.9
                }
            };
            const shipmentCreated = await createShipment(body);
            await agent.delete(`/shipment/${shipmentCreated._id}/parcel`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const removed = await findOne({_id: shipmentCreated._id});
            console.log('removed ', removed);
            assert(!removed.parcel);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment/parcel DELETE sohuld create a request given', async() => {
            await agent.delete('/shipment/1234567890qwertyuiopasdf/parcel')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
