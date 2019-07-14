const { calculateSalesTax } = require('../../../controllers/tax');
const schema = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/tax/order-tax', validate({ body: schema }), calculateSalesTax);

module.exports = router.routes();
