const jwt = require('jsonwebtoken');

const debug = require('../../lib/debug');

const { jwt: { expiresIn, secret } } = require('../../config'); // get db config file

module.exports = (params) => {
    debug.info('params to get token : ', params);
    return jwt.sign(params, secret, { expiresIn });
};
