const assert = require('assert');

const { findOne: findOneShipment, delete: deleteShipment } = require('../../../../stores/shipment');
const features = require('./features');

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment POST sohuld create a request given', async() => {
            features();
            const body = {
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
            const { body: res } = await agent
                .post('/shipment')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success);
            assert(res.shipment);
            const shipment = await findOneShipment({_id:res.shipment._id});
            assert(shipment.isActive === undefined);
            assert(shipment.toAddress);
            assert(shipment.fromAddress);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
