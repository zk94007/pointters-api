const { putStore } = require('../../../controllers/store');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/store/:idStore', validate({ body, params }), putStore);

module.exports = router.routes();
