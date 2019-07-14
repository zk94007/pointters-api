const { postuserFollow } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/:followedId/follow', validate({ body: schema }), postuserFollow);

module.exports = router.routes();
