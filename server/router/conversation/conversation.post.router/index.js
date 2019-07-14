const { postConversation } = require('../../../controllers/conversation');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .post('/conversation', validate({ body: schema }), postConversation);

module.exports = router.routes();
