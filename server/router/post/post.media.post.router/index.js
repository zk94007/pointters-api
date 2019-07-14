const { postpostMedia } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/post/:idPost/media', validate({ body, params }), postpostMedia);

module.exports = router.routes();
