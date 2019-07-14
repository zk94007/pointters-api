const assert = require('assert');

const {delete: deleteShipment, create: createShipment} = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment GET sohuld create a request given', async() => {
            const body = {
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
                },
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const {body:{toAddress}} = await agent.get(`/shipment/${shipmentCreated._id}/to-address`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            delete toAddress.verifications;
            assert.deepStrictEqual(toAddress, body.toAddress);
        });
    });

    describe('FAIL', () => {
        it('/shipment/:idShipment GET sohuld create a request given', async() => {
            await agent.get('/shipment/1234567890qwertyuiopasdf/to-address')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteShipment({}));
});
