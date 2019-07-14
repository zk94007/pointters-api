const { getuser } = require('../../../controllers/user');
const schema = require('./params-schema');
const query = require('./query-schema');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user', validate({
    params: schema,
    query,
    body
}), getuser);

module.exports = router.routes();
