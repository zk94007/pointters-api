const assert = require('assert');

const {delete: deleteCategody, create: createCategory, findOne: findOneCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const category = {
                keywords: [ 'string' ],
                name: 'name put',
                userId: __user._id
            };
            const categoryCreated = await createCategory(category);
            console.log('categoryCreated ', categoryCreated);
            const update = {
                name: 'name put 2',

            };
            await agent.put(`/category/${categoryCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneCategory({ _id: categoryCreated._id });
            assert.deepEqual(updated.name, update.name);
        });
    });

    describe('FAIL', () => {
        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const update = {
                name: 'name put 2',

            };
            await agent.put('/category/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
