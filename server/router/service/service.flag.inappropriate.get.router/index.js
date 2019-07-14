const { getServiceFlagInappropriate } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/service/:idService/flag-inappropriate', validate({ body: schema }), getServiceFlagInappropriate);

module.exports = router.routes();
