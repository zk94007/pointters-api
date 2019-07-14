const { getuserFollow } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/:followedId/follow', validate({ body: schema }), getuserFollow);

module.exports = router.routes();
