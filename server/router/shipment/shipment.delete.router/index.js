const { deleteShipment } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


router.delete('/shipment/:idShipment', validate({ body, params }), deleteShipment);

module.exports = router.routes();
