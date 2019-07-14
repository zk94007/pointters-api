const { userOptValidate } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/otp/validate', async(ctx, next) => {
    await next();
}

, validate({ body: schema }), userOptValidate);

module.exports = router.routes();
