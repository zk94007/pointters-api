const { getSearchPage } = require('../../../controllers/search');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/search-page', validate({ body: schema }), getSearchPage);

module.exports = router.routes();
