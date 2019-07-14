const { putOrderAcceptScheduleChange } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/order/:idOrder/accept-schedule-change', validate({ body, params }), putOrderAcceptScheduleChange);

module.exports = router.routes();
