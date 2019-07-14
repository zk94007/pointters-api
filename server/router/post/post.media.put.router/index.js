const { putpostMedia } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/post/:idPost/media/:idMedia?', validate({ body, params }), putpostMedia);

module.exports = router.routes();
