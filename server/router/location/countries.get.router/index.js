const { getCountries } = require('../../../controllers/location');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/location/countries', validate({ body, params}), getCountries);

module.exports = router.routes();
