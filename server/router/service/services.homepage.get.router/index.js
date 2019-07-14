const { getServicesHomepage } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/homepage', validate({ body: schema }), getServicesHomepage);

module.exports = router.routes();
