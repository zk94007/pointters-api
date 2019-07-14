const assert = require('assert');

const feature = require('./features');
const {
    findOne: findOneShipment,
    delete: deleteShipment,
create: createShipment } = require('../../../../stores/shipment');

describe('User requests', () => {
    before(() => feature());
    describe('SUCCESS', () => {
        it('/shipment/:id/parcel POST sohuld create a request given', async() => {
            const body = {
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const parcel = {
                length: 20.2,
                width: 10.9,
                height: 5,
                weight: 65.9
            };
            await agent.post(`/shipment/${shipmentCreated._id}/parcel`)
                .send(parcel)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            delete updated.parcel.verifications;
            console.log('updated.parcel ', updated.parcel);
            assert(updated.parcel.length, parcel.length);
            assert(updated.parcel.width, parcel.width);
            assert(updated.parcel.height, parcel.height);
            assert(updated.parcel.weight, parcel.weight);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
