const { postuserInvite } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/invite', validate({ body: schema }), postuserInvite);

module.exports = router.routes();
