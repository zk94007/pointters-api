const { postrequest } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/request', validate({ body, params }), postrequest);

module.exports = router.routes();
