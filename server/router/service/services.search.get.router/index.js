const { getServicesSearch } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/services/search', validate({ body: schema }), getServicesSearch);

module.exports = router.routes();
