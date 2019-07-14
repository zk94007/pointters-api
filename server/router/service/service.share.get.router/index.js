const { getserviceShare } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/service/:idService/share', validate({ body: schema }), getserviceShare);

module.exports = router.routes();
