const { putOrderStartService } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/order/:idOrder/start-service', validate({ body, params }), putOrderStartService);

module.exports = router.routes();
