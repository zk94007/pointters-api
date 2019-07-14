const { postuserSettings } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/setting', validate({ body: schema }), postuserSettings);

module.exports = router.routes();
