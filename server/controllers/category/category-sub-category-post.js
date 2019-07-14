const { subCategory:{push: pushCategory} } = require('../../../stores/category');
const { findOne: findUser } = require('../../../stores/user');

module.exports = async(ctx) => {
    const user = await findUser(ctx.queryToFindUserById);

    if (!user || !user.isAdmin) return ctx.throw(401);
    const query = {
        _id: ctx.params.idCategory
    };
    const category = await pushCategory(query, ctx.request.body);
    if (!category || category.error) ctx
        .throw(404, category.error ? category.error.message : 'Not found');

    ctx.body = { success: true, subCategories:category.subCategories };
};
