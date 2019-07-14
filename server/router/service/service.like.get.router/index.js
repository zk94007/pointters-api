const { getserviceLike } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/service/:idService/like', validate({ body: schema }), getserviceLike);

module.exports = router.routes();
