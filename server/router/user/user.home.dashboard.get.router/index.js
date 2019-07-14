const { getHomeDashboard } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/home/dashboard', validate({ body: schema }), getHomeDashboard);

module.exports = router.routes();
