const { getCategorySubCategory } = require('../../../controllers/category');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/category/:idCategory/sub-category/:idSubCategory',
    validate({ body, params }),
    getCategorySubCategory
);

module.exports = router.routes();
