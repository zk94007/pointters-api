const { deleteStore } = require('../../../controllers/store');
const schema = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/store/:idStore', validate({ body: schema }), deleteStore);

module.exports = router.routes();
