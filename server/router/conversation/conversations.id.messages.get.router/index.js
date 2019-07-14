const { getConversationMessages } = require('../../../controllers/conversation');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/conversation/:idConversation/messages', validate({ body: schema }), getConversationMessages);

module.exports = router.routes();
