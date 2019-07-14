const { getHomepagePublic } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/homepage/public', validate({ body: schema }), getHomepagePublic);

module.exports = router.routes();
