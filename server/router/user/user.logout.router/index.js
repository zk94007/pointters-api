
const { userlogout } = require('../../../controllers/user');
const validate = require('koa2-validation');
const schema = require('./body-schema');
const Router = require('koa-router');
const router = new Router();

router.post('/user/logout', validate({ body: schema }), userlogout);

module.exports = router.routes();
