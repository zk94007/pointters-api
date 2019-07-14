const assert = require('assert');

const { create: createCategory, delete: deleteCategody, findOne: findOneCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory DELETE sohuld create a request given', async () => {
            const category = {
                userId: __user._id,
                keywords: [ 'string' ],
                name: 'name delete'
            };
            const categoryCreated = await createCategory(category);
            const {body: res} = await agent.delete(`/category/${categoryCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success === true);
            const categoryNotActive = findOneCategory({ _id: categoryCreated._id });
            assert(!categoryNotActive.isActive);
        });
    });

    describe('FAIL', () => {
        it('/category/:idCategory DELETE sohuld create a request given', async () => {
        await agent.delete(`/category/1234567890qwertyuiopasdf`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
