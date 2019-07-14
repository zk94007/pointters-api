const {subCategory:{ pull: pullCategory }} = require('../../../stores/category');
const {findOne: findUser} = require('../../../stores/user');

module.exports = async (ctx) => {
    const user = await findUser(ctx.queryToFindUserById);

    if (!user || !user.isAdmin) return ctx.throw(401);
    const query = {_id: ctx.params.idCategory};
    const subCategories = await pullCategory(query, ctx.params.idSubCategory);

    if (!subCategories || subCategories.error) ctx.throw(404, 'Not found');

    ctx.body = { success: true };
};
