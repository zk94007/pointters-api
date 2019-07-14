const { deleteuserSettings } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/user/setting', validate({ body: schema }), deleteuserSettings);

module.exports = router.routes();
