const jwt = require('koa-jwt');
const unless = require('./unless');


const { jwt: { secret, expiresIn } } = require('../../../config');
const middleware = jwt({ secret, expiresIn });
middleware.unless = unless(middleware);

module.exports = middleware;
