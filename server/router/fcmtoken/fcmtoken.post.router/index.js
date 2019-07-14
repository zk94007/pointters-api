const { postFcmToken } = require('../../../controllers/fcmtoken');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/fcmtoken', validate({ body }), postFcmToken);

module.exports = router.routes();
