const { getInviteSuggestedFb } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/users/invite-suggested/fb', validate({ body: schema }), getInviteSuggestedFb);

module.exports = router.routes();
