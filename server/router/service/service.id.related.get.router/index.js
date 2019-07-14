const { getserviceRelated } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/service/:idService/related', validate({ body: schema }), getserviceRelated);

module.exports = router.routes();