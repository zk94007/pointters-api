const { getEligibility } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/user/seller-eligibility', validate({ body: schema }), getEligibility);

module.exports = router.routes();
