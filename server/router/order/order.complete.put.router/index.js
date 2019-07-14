const { putOrderComplete } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/order/:idOrder/completed-service', validate({ body, params }), putOrderComplete);

module.exports = router.routes();
