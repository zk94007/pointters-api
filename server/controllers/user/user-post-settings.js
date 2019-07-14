const { update } = require('../../../stores/user');

const errorMessageInUpdateSettings = 'Error in update user';
module.exports = async(ctx) => {
    const settings = ctx.request.body;
    const { error } = await update(ctx.queryToFindUserById, { settings });

    if (error) ctx.throw(404, errorMessageInUpdateSettings);

    ctx.status = 200;
    ctx.body = { success: true };
};
