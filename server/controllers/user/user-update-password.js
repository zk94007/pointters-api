const { update, findOne, comparePassword } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const getHeaders = require('../../lib/get-headers');
const getSession = require('../../lib/get-session');

module.exports = async (ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);
    if (!user || user.error) ctx.throw(404, 'User not found');
    const isMatch = await comparePassword(ctx.request.body.oldPassword, user.password);

    const isValidToResetTheUser = user &&
        isMatch &&
        !user.error &&
        !isMatch.error;

    if (!isValidToResetTheUser) return ctx.throw(404, 'The old password is not valid');

    const updateTheAuthSettings = {
        password: ctx.request.body.newPassword,
        resetPasswordExpires: null,
        tempPassword: null
    };
    const { error } = await update(queryToFindUser, updateTheAuthSettings);

    if (error) ctx.throw(404, error.message);
    const token = signToken({ id: user._id });
    ctx.response.set(getHeaders());
    ctx.session = getSession(user);
    ctx.status = 200;
    ctx.body = { success: true, token: token };
};
