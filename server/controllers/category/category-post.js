const { create: createCategory } = require('../../../stores/category');
const { findOne: findUser } = require('../../../stores/user');

const errorMessage = 'Not found';
module.exports = async(ctx) => {
    const user = await findUser(ctx.queryToFindUserById);
    console.log('user  = ', user);
    if (!ctx.state.user|| !user || !user.isAdmin) return ctx.throw(401);
    const categoryToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    console.log('categoryToCreate ', categoryToCreate);
    const category = await createCategory(categoryToCreate);
    console.log('category ', category);

    if (!category || category.error) ctx.throw(400, errorMessage);

    ctx.body = { success: true, category };
};
