const { getuserSettings } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/setting', validate({ body: schema }), getuserSettings);

module.exports = router.routes();
