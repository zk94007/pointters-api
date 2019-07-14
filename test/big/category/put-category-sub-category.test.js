const assert = require('assert');

const {delete: deleteCategody, create: createCategory, findOne: findOneCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const update = {
                name: 'name put 2 sub'
            };
            const categoryCreated = await createCategory(body);
            const {body:{subCategories}} = await agent.put(`/category/${categoryCreated._id}/sub-category/${categoryCreated.subCategories[0]._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(subCategories.length === 1);
            const updated = await findOneCategory({_id:categoryCreated._id});
            assert.deepStrictEqual(updated.subCategories[0].name, update.name);
            assert(updated.subCategories.length === 1);
        });
    });

    describe('FAIL', () => {
        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const update = {
                name: 'name put 2 sub'
            };
            await agent.put('/category/1234567890qwertyuiopasdf/sub-category/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });

        it('/category/:idCategory PUT sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const update = {
                name: 'name put 2 sub'
            };
            const categoryCreated = await createCategory(body);
            await agent.put(`/category/${categoryCreated._id}/sub-category/1234567890qwertyuiopasdf`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
