
const { findOne } = require('../../../../stores/user');
const signToken = require('../../../lib/sign-token');
const getHeaders = require('../../../lib/get-headers');
const getSession = require('../../../lib/get-session');
const { socialNetwork: { facebook: { validateTokenFacebook } } } = require('../../../../services');
const createUser = require('./create-user');
const debug = require('../../../../lib/debug');

const socialNetwork = 'facebook';
module.exports = async(ctx) => {
    ctx.body = {};
    const { body: { token: facebookToken } } = ctx.request;
    const { name, id: idFacebook, error } = await validateTokenFacebook(facebookToken);
    console.log('name ', name);
    console.log('idFacebook ', idFacebook);
    console.log('error ', error);
    if (error) {
        debug.service.error(`Error from facebook ${error.message}`);
        ctx.status = 403;
        ctx.body = { msg: 'Token not Valid' };
        return;
    }

    const savedUser = await findOne({
        'socialNetwork.id': idFacebook,
        'socialNetwork.name': socialNetwork
    });

    let userCreatedOrUpdated = savedUser;
    ctx.body.msg = 'Successful login';

    const [ firstName, lastName ] = name.split(' ');
    if (!savedUser) {
        userCreatedOrUpdated = await createUser(ctx, { idFacebook, firstName, lastName });
        ctx.body.msg = 'Successful created a new user';
        ctx.body.completedRegistration = false;
    }else{
        if (savedUser.completedRegistration) ctx.body.completedRegistration = savedUser.completedRegistration
        else ctx.body.completedRegistration = false;
    }

    if (userCreatedOrUpdated.error) ctx.throw(404, userCreatedOrUpdated.error.message);

    const paramsToGetToken = { id: userCreatedOrUpdated._id };
    const token = signToken(paramsToGetToken);
    ctx.response.set(getHeaders());
    ctx.session = getSession(userCreatedOrUpdated);
    Object.assign(ctx.body, {
        success: true,
        id: userCreatedOrUpdated._id,
        token
    });
};
