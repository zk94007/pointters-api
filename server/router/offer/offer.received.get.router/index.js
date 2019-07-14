const { getOfferReceived } = require('../../../controllers/offer');
const body = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/offers/received', validate({ body}), getOfferReceived);

module.exports = router.routes();
