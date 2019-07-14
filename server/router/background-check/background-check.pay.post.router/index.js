const { postBackgroundCheckPay } = require('../../../controllers/background-check');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/background-check/pay', validate({ body, params }), postBackgroundCheckPay);

module.exports = router.routes();
