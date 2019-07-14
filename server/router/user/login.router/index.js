
const { userlogin } = require('../../../controllers/user');
const validate = require('koa2-validation');
const schema = require('./body-schema');
const Router = require('koa-router');
const router = new Router();

router.post('/user/login', validate({ body: schema }), userlogin);

module.exports = router.routes();
