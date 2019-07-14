const { postShipmentAddress } = require('../../../controllers/shipment-address');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/shipment-address', validate({ body, params }), postShipmentAddress);

module.exports = router.routes();
