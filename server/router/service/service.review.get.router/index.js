const { getserviceReview } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

const path = [
    '/service/(review|reviews)/:reviewId?',
    '/service/:idService/reviews'
];
router
    .get(path, validate({ body: schema }), getserviceReview);

module.exports = router.routes();
