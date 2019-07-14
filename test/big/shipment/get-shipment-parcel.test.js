const assert = require('assert');

const {delete: deleteShipment, create: createShipment} = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment GET sohuld create a request given', async() => {
            const body = {
                parcel:{
                    length: 20.2,
                    width: 10.9,
                    height: 5,
                    weight: 65.9
                },
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const {body:{parcel}} = await agent.get(`/shipment/${shipmentCreated._id}/parcel`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            delete parcel.verifications;
            assert.deepStrictEqual(parcel, body.parcel);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment GET sohuld create a request given', async() => {
            await agent.get('/shipment/1234567890qwertyuiopasdf/parcel')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
