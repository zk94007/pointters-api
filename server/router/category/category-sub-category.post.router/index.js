const { postCategorySubCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/category/:idCategory/sub-category', validate({ body, params }), postCategorySubCategory);

module.exports = router.routes();
