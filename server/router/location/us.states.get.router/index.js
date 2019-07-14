const { getUsStates } = require('../../../controllers/location');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/location/us-states', validate({ body, params}), getUsStates);

module.exports = router.routes();
