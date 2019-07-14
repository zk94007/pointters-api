const { update, findOne, comparePassword } = require('../../../stores/user');

module.exports = async (ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);
    if (!user || user.error) ctx.throw(404, 'User not found');
    const isMatch = await comparePassword(ctx.request.body.token, user.tempPassword);
    const isValidToResetTheUser = user &&
        new Date() < new Date(user.resetPasswordExpires) &&
        isMatch &&
        !user.error &&
        !isMatch.error;
    if (!isValidToResetTheUser) return ctx.throw(404, 'The token is not valid');

    ctx.status = 200;
    ctx.body = { message: "The token is valid" };
};
