const { getPaymentMethods } = require('../../../controllers/payment-braintree');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/braintree/payment-methods', validate({ body, params }), getPaymentMethods);

module.exports = router.routes();
