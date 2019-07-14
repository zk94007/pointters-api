const { getFollowers } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/followers', validate({ body: schema }), getFollowers);

module.exports = router.routes();
