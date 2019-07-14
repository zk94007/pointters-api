const {subCategory:{ get: getCategory }} = require('../../../stores/category');

module.exports = async (ctx) => {
    const categoryToupdate = ctx.request.body;
    const query = {
        '_id': ctx.params.idCategory,
        'subCategories._id': ctx.params.idSubCategory
    };
    console.log('query ', query);
    const subCategories = await getCategory(query, categoryToupdate);
    console.log('subCategories ', subCategories);
    if (!subCategories || subCategories.error) ctx.throw(404, 'Not found');

    ctx.body = { success: Boolean(subCategories.lenght), subCategories: subCategories || []};
};
