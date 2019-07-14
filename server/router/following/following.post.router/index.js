const { postFollowing } = require('../../../controllers/following');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/following/:idUser', validate({ body: schema }), postFollowing);

module.exports = router.routes();
