const assert = require('assert');
const { create: createServiece } = require('../../../stores/service');
describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/:id/related GET -> should return 200', async() => {
            const serviceData = {
                userId: __user._id,
                category:{
                    id: '12345',
                    name: 'home'
                },
                description: "/"
            };
            const service = await createServiece(serviceData);
            const { body: res } = await agent.get(`/service/${service._id}/related`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof res === 'object');
        });
        it('/service/:id/related GET -> should return 200', async() => {
            const serviceData = {
                userId: __user._id,
                category:{
                    id: '12345',
                    name: 'home'
                },
                location: { city: 'test' },
                description: "/"
            };
            const service = await createServiece(serviceData);
            const { body: res } = await agent.get(`/service/${service._id}/related`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(typeof res === 'object');
        });
    });
    describe('FAIL', () => {
        it('/service/:id/related GET -> should return 404', async() => {
            const { body: res } = await agent.get(`/service/:id/related`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
            assert( res.message === 'Error in find service' );
        });
    });
});