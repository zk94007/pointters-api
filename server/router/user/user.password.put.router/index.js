const { userUpdatePassword } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/user/password', validate({ body: schema }), userUpdatePassword);

module.exports = router.routes();
