const { getInviteSearch } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/invite/search', validate({ body: schema }), getInviteSearch);

module.exports = router.routes();
