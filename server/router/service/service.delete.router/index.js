const { deleteservice } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/service/:idService', validate({ body: schema }), deleteservice);

module.exports = router.routes();
