const { getMenu } = require('../../../controllers/user');
const schema = require('./params-schema');
const query = require('./query-schema');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/menu', validate({
    params: schema,
    query,
    body
}), getMenu);

module.exports = router.routes();
