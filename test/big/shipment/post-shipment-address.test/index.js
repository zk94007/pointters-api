const assert = require('assert');

const feature = require('./features');
const {
    findOne: findOneShipment,
    delete: deleteShipment,
create: createShipment } = require('../../../../stores/shipment');


describe('User requests', () => {
    before(() => feature());
    describe('SUCCESS', () => {
        it('/shipment/:id/toAddress POST sohuld create a request given', async() => {
            const body = {
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const toAddress = {
                street1: '417 MONTGOMERY ST',
                street2: 'FLOOR 5',
                city: 'SAN FRANCISCO',
                state: 'CA',
                zip: '94104',
                country: 'US',
                company: 'EasyPost',
                phone: '415-123-4567'
            };
            await agent.post(`/shipment/${shipmentCreated._id}/to-address`)
                .send(toAddress)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            delete updated.toAddress.verifications;
            assert(updated.toAddress.street1, toAddress.street1);
            assert(updated.toAddress.street2, toAddress.street2);
            assert(updated.toAddress.city, toAddress.city);
            assert(updated.toAddress.state, toAddress.state);
            assert(updated.toAddress.zip, toAddress.zip);
            assert(updated.toAddress.country, toAddress.country);
            assert(updated.toAddress.company, toAddress.company);
            assert(updated.toAddress.phone, toAddress.phone);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
