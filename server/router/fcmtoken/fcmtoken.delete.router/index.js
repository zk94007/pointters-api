const { deleteFcmToken } = require('../../../controllers/fcmtoken');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/fcmtoken', validate({ body }), deleteFcmToken);

module.exports = router.routes();
