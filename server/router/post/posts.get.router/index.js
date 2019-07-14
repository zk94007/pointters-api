const { getposts } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/posts', validate({ body, params }), getposts);

module.exports = router.routes();
