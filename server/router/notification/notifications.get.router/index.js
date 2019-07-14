const { getNotifications } = require('../../../controllers/notification');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();
router.get('/notifications', validate({ body }), getNotifications);

module.exports = router.routes();
