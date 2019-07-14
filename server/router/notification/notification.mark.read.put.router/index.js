const { markRead } = require('../../../controllers/notification');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


router.put('/notification/:idNotification/read', validate({ body, params }), markRead);

module.exports = router.routes();
