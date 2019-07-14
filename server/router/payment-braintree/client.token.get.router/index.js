const { getPaymentClientToken } = require('../../../controllers/payment-braintree');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/braintree/client-token', validate({ body, params}), getPaymentClientToken);

module.exports = router.routes();
