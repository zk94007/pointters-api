const { putCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/category/:idCategory', validate({ body, params }), putCategory);

module.exports = router.routes();
