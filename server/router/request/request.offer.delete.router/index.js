const { deleterequestOffer } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


router.delete('/request/offer/:idOffer', validate({ body, params }), deleterequestOffer);

module.exports = router.routes();
