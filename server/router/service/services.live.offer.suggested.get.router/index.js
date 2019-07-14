const { getLiveOfferSuggestedServices } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/services/live-offer-suggested', validate({ body: schema }), getLiveOfferSuggestedServices);

module.exports = router.routes();
