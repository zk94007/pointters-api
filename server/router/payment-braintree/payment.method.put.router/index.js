const { putPaymentMethod } = require('../../../controllers/payment-braintree');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/braintree/payment-method/:paymentMethodToken', validate({ body, params }), putPaymentMethod);

module.exports = router.routes();
