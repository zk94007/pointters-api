const { getpostLikes } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/post/:idPost/likes', validate({ body, params }), getpostLikes);

module.exports = router.routes();
