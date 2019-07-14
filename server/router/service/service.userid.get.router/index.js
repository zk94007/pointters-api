const { getservicesuser } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/services', validate({ body: schema }), getservicesuser);

module.exports = router.routes();