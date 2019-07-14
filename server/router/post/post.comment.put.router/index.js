const { putpostComment } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/post/comment/:idComment', validate({ body, params }), putpostComment);

module.exports = router.routes();
