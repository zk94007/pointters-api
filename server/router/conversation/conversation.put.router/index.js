const { putConversation } = require('../../../controllers/conversation');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/conversation/:idConversation', validate({ body: schema }), putConversation);

module.exports = router.routes();
