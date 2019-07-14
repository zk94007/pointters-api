const { getuserProfile } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/profile', validate({ body: schema }), getuserProfile);

module.exports = router.routes();
