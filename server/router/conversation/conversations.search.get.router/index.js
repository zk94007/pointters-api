const { getConversationsSearch } = require('../../../controllers/conversation');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/conversations/search', validate({ body: schema }), getConversationsSearch);

module.exports = router.routes();
