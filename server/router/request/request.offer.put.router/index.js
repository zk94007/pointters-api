const { putrequestOffer } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/request/offer/:idOffer', validate({ body, params }), putrequestOffer);

module.exports = router.routes();
