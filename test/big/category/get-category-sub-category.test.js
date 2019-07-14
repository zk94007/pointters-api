const assert = require('assert');

const {delete: deleteCategody, create: createCategory} = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory GET sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const categoryCreated = await createCategory(body);
            const {body:{subCategories}} = await agent.get(`/category/${categoryCreated._id}/sub-category/${categoryCreated.subCategories[0]._id}`)
                .expect(200);
            assert.deepStrictEqual(subCategories[0].keywords, body.subCategories[0].keywords);
            assert.equal(subCategories[0].name, body.subCategories[0].name);
        });
    });

    describe('FAIL', () => {
        it('/category/:idCategory GET sohuld create a request given', async() => {
            await agent
                .get('/category/1234567890qwertyuiopasdf/sub-category/1234567890qwertyuiopasdf')
                .expect(404);
        });

        it('/category/:idCategory GET sohuld return 404', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name put',
                subCategories:[ {
                    keywords: [ 'string' ],
                    name: 'name post'
                } ],
                userId: __user._id
            };
            const categoryCreated = await createCategory(body);
            await agent.get(`/category/${categoryCreated._id}/sub-category/1234567890qwertyuiopasdf`)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
