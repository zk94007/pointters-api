const { deletepostMedia } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/post/:idPost/media/:idMedia?', validate({ body, params }), deletepostMedia);

module.exports = router.routes();
