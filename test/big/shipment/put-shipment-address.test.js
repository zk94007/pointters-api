const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne: findOneShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                toAddress:{
                    object:	'string',
                    mode	:'string',
                    street1	:'string',
                    street2	:'string',
                    city	:'string',
                    state	:'string',
                    zip	:'string',
                    country	:'string',
                    residential	:true,
                    carrierFacility	:'string',
                    name	:'string',
                    company	:'string',
                    phone	:'string',
                    email	:'string',
                    federalTaxId	:'string',
                    stateTaxId	:'string',
                }
            };
            const update = {
                street1	:'string 2',
            };
            const shipmentCreated = await createShipment(body);
            await agent.put(`/shipment/${shipmentCreated._id}/to-address`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            assert.equal(updated.toAddress.street1, update.street1);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const update = {
                street1	:'string 2',
            };
            await agent.put('/shipment/1234567890qwertyuiopasdf/to-address')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
