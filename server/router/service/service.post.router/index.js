const { postservice } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/service', validate({ body: schema }), postservice);

module.exports = router.routes();
