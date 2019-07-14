const assert = require('assert');

const {delete: deleteCategody, create: createCategory, findOne} = require('../../../stores/category');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/category/:idCategory DELETE sohuld create a request given', async() => {
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
            await agent.delete(`/category/${categoryCreated._id}/sub-category/${categoryCreated.subCategories[0]._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const removed = await findOne({_id: categoryCreated._id});
            assert(!removed.subCategories.length);
        });
    });

    describe('FAIL', () => {
        it('/category/:idCategory DELETE sohuld return 404', async() => {
            await agent.delete('/category/dddddddddddddddd12345678/sub-category/dddddddddddddddd12345678')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });

        it('/category/:idCategory DELETE sohuld return 404', async() => {
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
            await agent.delete(`/category/${categoryCreated._id}/sub-category/dddddddddddddddd12345678`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });

    after(() => deleteCategody({}));
});
