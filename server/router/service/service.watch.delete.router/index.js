const { deleteserviceWatching } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .delete('/service/:idService/watch', validate({ body: schema }), deleteserviceWatching);

module.exports = router.routes();
