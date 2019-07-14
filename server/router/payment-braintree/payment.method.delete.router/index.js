const { deletePaymentMethod } = require('../../../controllers/payment-braintree');
const schema = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/braintree/payment-method/:paymentMethodToken', validate({ body: schema }), deletePaymentMethod);

module.exports = router.routes();
