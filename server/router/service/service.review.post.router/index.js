const { postserviceReview } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .post('/service/:serviceId/review', validate({ body: schema }), postserviceReview);

module.exports = router.routes();
