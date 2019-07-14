const { getInviteSuggested } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/users/invite-suggested', validate({ body: schema }), getInviteSuggested);

module.exports = router.routes();
