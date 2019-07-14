const { putCategorySubCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/category/:idCategory/sub-category/:idSubCategory', validate({ body, params }), putCategorySubCategory);

module.exports = router.routes();
