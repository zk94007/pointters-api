const assert = require('assert');

const {
    findOne: findOneCategory,
    delete: deleteCategody,
create: createCategory } = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category POST sohuld create a request given', async() => {
            const body = {
                keywords: [ 'string' ],
                name: 'name post',
                userId: __user._id
            };
            const categoryCreated = await createCategory(body);
            const subCategory = {
                keywords: [ 'string sub' ],
                name: 'sub name post',
            };
            const {body: {subCategories}} = await agent.post(`/category/${categoryCreated._id}/sub-category`)
                .send(subCategory)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(subCategories.length === 1);
            const updated = await findOneCategory({_id:categoryCreated._id});
            assert.deepStrictEqual(updated.subCategories[0].keywords, subCategory.keywords);
            assert.equal(updated.subCategories[0].name, subCategory.name);
            assert.equal(updated.subCategories[0]._id, subCategories[0]._id);

            assert(updated.subCategories.length === 1);
        });
    });

    describe('FAIL', () => {
        it('/category/subCategory catch the error with cateogry does not exists', async() => {
            const subCategory = {
                keywords: [ 'string sub' ],
                name: 'sub name post',
            };
            await agent.post('/category/59bddaa97de7b907bbb600da/sub-category')
                .send(subCategory)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
