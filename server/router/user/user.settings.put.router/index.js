const { putuserSettings } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/user/setting', validate({ body: schema }), putuserSettings);

module.exports = router.routes();
