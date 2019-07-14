const { userOpt } = require('../../../controllers/user');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/user/otp', async(ctx, next) => {
    console.log('ctx.request.body', ctx.request.body);
    await next();
}

, validate({ body: schema }), userOpt);

module.exports = router.routes();
