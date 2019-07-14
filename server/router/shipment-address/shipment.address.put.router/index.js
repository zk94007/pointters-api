const { putShipmentAddress } = require('../../../controllers/shipment-address');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/shipment-address/:idShipmentAddress', validate({ body, params }), putShipmentAddress);

module.exports = router.routes();
