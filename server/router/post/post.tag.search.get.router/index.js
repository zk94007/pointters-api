const { getPostTagSearch } = require('../../../controllers/post');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/post/tag/search', validate({ body: schema }), getPostTagSearch);

module.exports = router.routes();
