const assert = require('assert');

const { findOne: findOneCategory, delete: deleteCategody } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category POST sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name post',
            };

            const { body: res } = await agent
                .post('/category')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success);
            assert(res.category._id);
            const category = await findOneCategory(body);
            assert(category.isActive === undefined);
        });
    });

    describe('FAIL', () => {
        it('/category POST sohuld create a request given', async() => {
            await agent
                .post('/category')
                .send({})
                .set(authorizationHeader)
                .set(Cookie)
                .expect(400);
        });
    });

    after(() => deleteCategody({}));
});
