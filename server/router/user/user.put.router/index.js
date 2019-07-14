const { putuser } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.put('/user', validate({ body: schema }), putuser);

module.exports = router.routes();
