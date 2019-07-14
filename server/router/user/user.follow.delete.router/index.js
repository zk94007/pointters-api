const { deleteuserFollow } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/user/:followedId/follow', validate({ body: schema }), deleteuserFollow);

module.exports = router.routes();
