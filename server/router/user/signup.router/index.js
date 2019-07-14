const { usersignup } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/signup', validate({ body: schema }), usersignup);

module.exports = router.routes();
