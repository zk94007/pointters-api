const { findOne } = require('../../../stores/user');

module.exports = async(ctx) => {
    const user = await findOne(ctx.queryToFindUserById);
    if (!user || user.error) {
        ctx.status = 404;
        ctx.body = 'No User found';
        return;
    }
    ctx.status = 200;
    ctx.body = user.settings;
};
