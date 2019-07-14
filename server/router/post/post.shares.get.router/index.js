const { getpostShares } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/post/:idPost/shares', validate({ body, params }), getpostShares);

module.exports = router.routes();
