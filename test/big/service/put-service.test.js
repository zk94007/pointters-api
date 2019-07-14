const assert = require('assert');

const { findOne, create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service PUT sohuld create a service given', async() => {
            const body = {
                category: {
                    id:'123',
                    name:'Home'
                },
                userId:require('mongoose').Types.ObjectId(),
                description: 'service description',
                fulfillmentMethod: {
                    local:true,
                    online:false,
                    shipment:false,
                    store:false
                },
                location: [ {
                    city:'Chicago',
                    country:'US',
                    geoJson: {
                        type: 'Point',
                        coordinates: [ -73.856077, 40.848447 ]
                    },
                    postalCode:'12345',
                    province:'',
                    state:'IL'
                } ],
                media:
                {
                    fileName:'123.jpg',
                    mediaType:'image'
                },
                pricing: {
                    description:'1 hour service',
                    price:20,
                    time:'1',
                    timeUnitOfMeasure:'hour'
                }
            };
            const serviceCreated = await create(body);
            console.log('serviceCreated ', serviceCreated);
            const update = {
                category: {
                    category: 'category-updated'
                }
            };
            await agent.put(`/service/${serviceCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOne({ _id: serviceCreated._id });
            assert.deepEqual(updated.category, update.category);
        });
    });

    describe('FAIL', () => {
        it('/service PUT sohuld create a service given', async() => {
            await agent.put('/service/wesdaqswedfrtgyt345re456')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
