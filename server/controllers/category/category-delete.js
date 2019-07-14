const { remove: removeCategory } = require('../../../stores/category');
const { findOne: findUser } = require('../../../stores/user');

const errorMessage = 'Category does not exists';
module.exports = async(ctx) => {
    const user = await findUser(ctx.queryToFindUserById);

    if (!user || !user.isAdmin) return ctx.throw(401);
    console.log('ctx.params.idCategory in delete', ctx.params.idCategory);
    const categoryRemoved = await removeCategory({ _id: ctx.params.idCategory });
    console.log('categoryRemoved', categoryRemoved);
    if (!categoryRemoved || categoryRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
