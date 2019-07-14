const { getFollowing } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/following', validate({ body: schema }), getFollowing);

module.exports = router.routes();
