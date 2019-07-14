const { postFacebookToken } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/facebook/token', validate({ body: schema }), postFacebookToken);

module.exports = router.routes();
