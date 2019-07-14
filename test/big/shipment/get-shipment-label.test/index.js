const assert = require('assert');

const { create, delete: deleteShipment } = require('../../../../stores/shipment');
const features = require('./features');

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment POST sohuld create a request given', async() => {
            features();
            const body = {
                userId: __user._id,
                externalId:'shp_189dfd11110f491f89a69fd72431557b',
                toAddress:{
                    street1: '417 MONTGOMERY ST',
                    street2: 'FLOOR 5',
                    city: 'SAN FRANCISCO',
                    state: 'CA',
                    zip: '94104',
                    country: 'US',
                    company: 'EasyPost',
                    phone: '415-123-4567'
                },
                fromAddress: {
                    street1: '417 MONTGOMERY ST',
                    street2: 'FLOOR 5',
                    city: 'SAN FRANCISCO',
                    state: 'CA',
                    zip: '94104',
                    country: 'US',
                    company: 'EasyPost',
                    phone: '415-123-4567'
                },
                parcel:{
                    length: 20.2,
                    width: 10.9,
                    height: 5,
                    weight: 65.9
                },
                eelPfc: 'NOEEI 30.37(a)',
                customsCertify: true,
                customsSigner: 'Steve Brule',
                contentsType: 'merchandise',
                contentsExplanation: '',
                restrictionType: 'none',
                restrictionComments: '',
                nonDeliveryOption: 'abandon',
                items:[ {
                    description: 'T-shirt',
                    quantity: 1,
                    value: 10,
                    weight: 5,
                    hsTariffNumber: '123456',
                    originCountry: 'us'
                } ]
            };
            console.log('body ', body);
            const shipment = await create(body);
            console.log('shipments ', shipment);
            const { body: res } = await agent
                .get(`/shipment/${shipment._id}/label`)
                .send({
                    trackingCode: '9400110898825022579493',
                    carrier: 'USPS',
                    amount: '100.00',
                    reference: 'insuranceRef1'
                })
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(res.label);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
