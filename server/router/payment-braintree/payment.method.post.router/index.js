const { postPaymentMethod } = require('../../../controllers/payment-braintree');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/braintree/payment-method', validate({ body, params }), postPaymentMethod);

module.exports = router.routes();
