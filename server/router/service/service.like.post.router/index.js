const { postserviceLike } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/service/:idService/like', validate({ body: schema }), postserviceLike);

module.exports = router.routes();
