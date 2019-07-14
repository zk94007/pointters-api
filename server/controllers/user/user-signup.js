const { create } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const getHeaders = require('../../lib/get-headers');
const getSession = require('../../lib/get-session');


const successMessage = 'Successful created a new user.';
const duplicateKeyRegex = /.*duplicate.*email.*/;
const errorMessageDuplicateEmail = 'Email is already used';

module.exports = async(ctx) => {
    console.log("--------signup---------");
    const dataOfUserToSignUp = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    };
    const savedUser = await create(dataOfUserToSignUp);
    const isDuplicateTheEmail = savedUser.error &&
        duplicateKeyRegex.test(savedUser.error.message);

    if (isDuplicateTheEmail) ctx.throw(409, errorMessageDuplicateEmail);

    const token = signToken({ id: savedUser._id, email: savedUser.email });
    ctx.response.set(getHeaders());
    ctx.session = getSession(savedUser);
    ctx.body = {
        success: true,
        id: savedUser._id, msg:
        successMessage,
        token
    };
};

