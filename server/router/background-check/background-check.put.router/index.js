const { postBackgroundCheck } = require('../../../controllers/background-check');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/background-check/:id', validate({ body, params }), postBackgroundCheck);

module.exports = router.routes();
