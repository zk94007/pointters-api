const { postCheckoutFees } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/checkout/fees', validate({ body, params }), postCheckoutFees);

module.exports = router.routes();
