const { postCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/category', validate({ body, params }), postCategory);

module.exports = router.routes();
