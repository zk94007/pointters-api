const { postShipmentToAddress } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/shipment/:idShipment/to-address', validate({ body, params }), postShipmentToAddress);

module.exports = router.routes();
