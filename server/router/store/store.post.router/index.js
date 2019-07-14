const { postStore } = require('../../../controllers/store');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/store', validate({ body, params }), postStore);

module.exports = router.routes();
