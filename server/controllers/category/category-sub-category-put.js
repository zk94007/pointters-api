const {subCategory:{ put: putCategory }} = require('../../../stores/category');
const {findOne: findUser} = require('../../../stores/user');

module.exports = async (ctx) => {
    const user = await findUser(ctx.queryToFindUserById);
    console.log('user ', user);
    if (!user || !user.isAdmin) return ctx.throw(401);
    const categoryToupdate = ctx.request.body;
    const query = {
        '_id': ctx.params.idCategory,
        'subCategories._id': ctx.params.idSubCategory
    };
    console.log('query', query);
    const category = await putCategory(query, categoryToupdate);
    console.log('category', category);
    if (!category || category.error) ctx.throw(404);

    ctx.body = { success: true, subCategories : category.subCategories || []};
};
