const { putOrderSellerDeliveredMedia } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/order/:idOrder/seller-delivered-media', validate({ body, params }), putOrderSellerDeliveredMedia);

module.exports = router.routes();
