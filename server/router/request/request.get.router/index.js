const { getrequest } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const query = require('./query-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


router.get('/request/:idRequest?', validate({ body, params, query}), getrequest);

module.exports = router.routes();
