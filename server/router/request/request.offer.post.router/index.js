const { postrequestOffer } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/request/:idRequest/offer', validate({ body, params }), postrequestOffer);

module.exports = router.routes();
