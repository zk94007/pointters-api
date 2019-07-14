const { getBackgroundCheckFee } = require('../../../controllers/background-check');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/background-check/fee', validate({ body, params }), getBackgroundCheckFee);

module.exports = router.routes();
