const { putservice } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/service/:idService', validate({ body: schema }), putservice);

module.exports = router.routes();
