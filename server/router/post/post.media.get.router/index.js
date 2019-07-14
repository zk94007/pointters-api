const { getpostMedia } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/post/:idPost/media/:idMedia?', validate({ body, params }), getpostMedia);

module.exports = router.routes();
