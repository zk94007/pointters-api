const { postSearch } = require('../../../controllers/search');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/search', validate({ body: schema }), postSearch);

module.exports = router.routes();
