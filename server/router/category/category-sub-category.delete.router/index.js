const { deleteCategorySubCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

const path = '/category/:idCategory/sub-category/:idSubCategory';
router.delete(path, validate({ body, params }), deleteCategorySubCategory
);

module.exports = router.routes();
