const { postServiceFlagInappropriate } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .post('/service/:idService/flag-inappropriate', validate({ body: schema }), postServiceFlagInappropriate);

module.exports = router.routes();
