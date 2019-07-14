const { getTransactionHistory } = require('../../../controllers/order');
const body = require('./body-schema');
//const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/transaction-history', validate({ body}), getTransactionHistory);

module.exports = router.routes();
