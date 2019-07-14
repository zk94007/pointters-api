const { getServicesMobileHomepage } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/homepage/mobile', validate({ body: schema }), getServicesMobileHomepage);

module.exports = router.routes();
