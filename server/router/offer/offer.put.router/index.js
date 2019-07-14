const { putOffer } = require('../../../controllers/offer');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .put('/offer/:idOffer', validate({ body, params }), putOffer);

module.exports = router.routes();
