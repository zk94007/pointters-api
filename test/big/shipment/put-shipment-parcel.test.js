const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne: findOneShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                parcel:{
                    length: 20.2,
                    width: 10.9,
                    height: 5,
                    weight: 65.9
                }
            };
            const update = {
                length	: 123,
            };
            const shipmentCreated = await createShipment(body);
            await agent.put(`/shipment/${shipmentCreated._id}/parcel`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            assert.equal(updated.parcel.length, update.length);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const update = {
                street1	:'string 2',
            };
            await agent.put('/shipment/1234567890qwertyuiopasdf/parcel')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
