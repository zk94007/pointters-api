const { getCurrentUpdateSuggested } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/users/current-update-suggested', validate({ body: schema }), getCurrentUpdateSuggested);

module.exports = router.routes();
