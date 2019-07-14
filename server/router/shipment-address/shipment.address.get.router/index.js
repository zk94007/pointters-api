const { getShipmentAddress } = require('../../../controllers/shipment-address');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/shipment-address/:idShipmentAddress', validate({ body, params}), getShipmentAddress);

module.exports = router.routes();
