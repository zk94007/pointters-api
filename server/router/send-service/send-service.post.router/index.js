const { postSendService } = require('../../../controllers/send-service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .post('/send-service', validate({ body: schema }), postSendService);

module.exports = router.routes();
