const { putShipment } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/shipment/:idShipment', validate({ body, params }), putShipment);

module.exports = router.routes();
