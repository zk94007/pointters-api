const { putShipmentToAddress } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/shipment/:idShipment/to-address', validate({ body, params }), putShipmentToAddress);

module.exports = router.routes();
