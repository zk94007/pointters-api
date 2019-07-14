const { getrequestOffer } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');

const path = [
    '/request/offer/:idOffer',
    '/request/:idRequest/offers'
];
const router = new Router();

router.get(path, validate({ body, params }), getrequestOffer);

module.exports = router.routes();
