const { deletepostLike } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/post/:idPost/like', validate({ body, params }), deletepostLike);

module.exports = router.routes();
