const { deleteFollowing } = require('../../../controllers/following');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.delete('/following/:idfollowing', validate({ body: schema }), deleteFollowing);

module.exports = router.routes();
