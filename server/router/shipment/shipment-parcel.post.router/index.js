const { postShipmentParcel } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/shipment/:idShipment/parcel', validate({ body, params }), postShipmentParcel);

module.exports = router.routes();
