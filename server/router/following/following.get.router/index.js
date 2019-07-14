const { getFollowing } = require('../../../controllers/following');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/following/:idfollowing', validate({ body: schema }), getFollowing);

module.exports = router.routes();
