const cookie = require('koa-cookie');
const unless = require('./unless');
const middelware = cookie.default();

middelware.unless = unless(middelware);

module.exports = middelware;
