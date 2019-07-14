const { postShipment } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/shipment', validate({ body, params }), postShipment);

module.exports = router.routes();
