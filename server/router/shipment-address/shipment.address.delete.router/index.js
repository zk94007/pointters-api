const { deleteShipmentAddress } = require('../../../controllers/shipment-address');
const schema = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/shipment-address/:idShipmentAddress', validate({ body: schema }), deleteShipmentAddress);

module.exports = router.routes();
